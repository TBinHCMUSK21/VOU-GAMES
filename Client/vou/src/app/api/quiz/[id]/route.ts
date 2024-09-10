import { NextRequest, NextResponse } from "next/server";

interface Token {
	accessToken: string;
}

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const quizId = params.id;
	const SPRING_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
	if (!SPRING_API_BASE_URL) {
		return NextResponse.json(
			{ error: "API URL not configured" },
			{ status: 500 }
		);
	}

	const tokenString = sessionStorage.getItem('token');
	if (!tokenString) {
		throw new Error('Token not found');
	}
	const token: Token = JSON.parse(tokenString);
	const accessToken = token.accessToken;

	try {
		const response = await fetch(
			`${SPRING_API_BASE_URL}/api/games/quiz/${quizId}?_=${new Date().getTime()}`,
			{
				headers: {
					"Cache-Control": "no-store, max-age=0",
					'Authorization': `Bearer ${accessToken}`
				},
				method: "GET",
			}
		);

		if (!response.ok) {
			return NextResponse.json(
				{ error: "Failed to fetch quiz data from the backend" },
				{ status: response.status }
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching data from Spring Boot API:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
