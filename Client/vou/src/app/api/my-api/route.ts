import { NextResponse } from "next/server";

export async function POST() {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/my-api`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
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
