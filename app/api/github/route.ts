import {NextResponse} from "next/server";

export async function GET() {
    try {
        const token = process.env.GITHUB_TOKEN;
        const response = await fetch('https://api.github.com/user/repos', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            next: { revalidate: 3600 } // Revalidate every hour
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch Github Repositories: ${response.statusText}`);
        }

        const repos = await response.json();


        return NextResponse.json(repos);

    } catch(error) {
        console.error("Error fetching Github Repositories:", error);
        return NextResponse.json({
            error: "Failed to fetch Github Repositories",
            status: 500 
        })
    }
}