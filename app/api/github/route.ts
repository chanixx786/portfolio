import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://api.github.com/user/repos?visibility=public",
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 60 }, // Cache control
    }
  );

  if (!res) {
    return NextResponse.json(
        { error: "Failed to fetch repos"},
    );
  }
  return NextResponse.json(await res.json());
}
