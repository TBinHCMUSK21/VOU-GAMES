import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: { eventgameId: string } }
) {
	const { eventgameId } = params;
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;

	if (!apiUrl) {
		return NextResponse.json(
			{ error: "API URL is not configured in environment variables" },
			{ status: 500 }
		);
	}

	try {
		const response = await fetch(
			`${apiUrl}/api/events/start-time/${eventgameId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			return NextResponse.json(errorData, { status: response.status });
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching event data from Spring Boot API:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
