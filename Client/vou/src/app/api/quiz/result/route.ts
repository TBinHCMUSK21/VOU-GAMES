import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const { userId, score, rank, gameId } = body;

		const apiUrl = process.env.NEXT_PUBLIC_API_URL;

		if (!userId || score === undefined || rank === undefined || !gameId) {
			return NextResponse.json(
				{ message: "Thiếu thông tin cần thiết trong body" },
				{ status: 400 }
			);
		}

		const response = await axios.post(`${apiUrl}/api/quiz/result`, {
			userId,
			score,
			rank,
			gameId,
		});

		return NextResponse.json(
			{ message: "Kết quả đã được gửi thành công" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Lỗi khi xử lý kết quả quiz:", error);

		return NextResponse.json(
			{ message: "Có lỗi xảy ra khi gửi kết quả" },
			{ status: 500 }
		);
	}
}
