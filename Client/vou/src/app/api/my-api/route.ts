import { NextResponse } from "next/server";
interface Token {
	accessToken: string;
}

export async function POST() {
	const tokenString = sessionStorage.getItem('token');
	if (!tokenString) {
		throw new Error('Token not found');
	}
	const token: Token = JSON.parse(tokenString);
	const accessToken = token.accessToken;

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/games/my-api`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					'Authorization': `Bearer ${accessToken}`
				},
				body: JSON.stringify({ message: "Hello" }),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to send message to Spring Boot API");
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ success: false, error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
