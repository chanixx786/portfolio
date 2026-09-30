export type Repo = {
  name: string;
  full_name?: string;
  description: string | null;
  language?: string | null;
  topics?: string[];
  image?: string | null;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string | null;
  tech: string[];
};

// Optional overrides by repo name (case-insensitive). Listed repos come first, in this order.
export const FEATURED: Record<string, { title?: string; image?: string }> = {};

export function toProjects(repos: Repo[]): Project[] {
  const featuredOrder = Object.keys(FEATURED).map((k) => k.toLowerCase());
  const rank = (name: string) => {
    const i = featuredOrder.indexOf(name.toLowerCase());
    return i === -1 ? Infinity : i;
  };

  return [...repos]
    .sort((a, b) => rank(a.name) - rank(b.name))
    .map((repo) => {
      const override =
        Object.entries(FEATURED).find(
          ([k]) => k.toLowerCase() === repo.name.toLowerCase()
        )?.[1] ?? {};

      const tech = Array.from(
        new Set([repo.language, ...(repo.topics ?? [])].filter(Boolean) as string[])
      );

      return {
        slug: repo.name.toLowerCase(),
        title: override.title ?? repo.name,
        description: repo.description ?? "No description provided.",
        image:
          override.image ??
          repo.image ??
          (repo.full_name
            ? `https://opengraph.githubassets.com/1/${repo.full_name}`
            : null),
        tech,
      };
    });
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch("/api/github");
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const json = await res.json();
  const repos: Repo[] = Array.isArray(json) ? json : json.repos ?? json.data ?? [];
  return toProjects(repos);
}