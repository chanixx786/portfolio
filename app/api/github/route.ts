import { NextResponse } from "next/server";

type GithubRepo = {
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  html_url: string;
  homepage: string | null;
  fork: boolean;
  private: boolean;
  pushed_at: string;
};

// Get the Social Images in Github
async function getSocialImage(htmlUrl: string): Promise<string | null> {
  try {
    const res = await fetch(htmlUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const html = await res.text();
    const match =
      html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i) ??
      html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/i);
    return match ? match[1].replace(/&amp;/g, "&") : null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const all: GithubRepo[] = [];

    for (let page = 1; ; page++) {
      const response = await fetch(
        `https://api.github.com/user/repos?visibility=public&affiliation=owner&sort=pushed&per_page=100&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
          },
          next: { revalidate: 3600 }, // Revalidate every hour
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch Github Repositories: ${response.statusText}`
        );
      }

      const batch: GithubRepo[] = await response.json();
      all.push(...batch);
      if (batch.length < 100) break;
    }

    const publicRepos = all.filter((r) => !r.private);

    const repos = await Promise.all(
    publicRepos.map(async (r) => ({
        name: r.name,
        full_name: r.full_name,
        description: r.description,
        language: r.language,
        topics: r.topics ?? [],
        html_url: r.html_url,
        homepage: r.homepage,
        fork: r.fork,
        pushed_at: r.pushed_at,
        image: await getSocialImage(r.html_url),
    }))
    );

    return NextResponse.json(repos);
  } catch (error) {
    console.error("Error fetching Github Repositories:", error);
    return NextResponse.json(
      { error: "Failed to fetch Github Repositories" },
      { status: 500 }
    );
  }
}