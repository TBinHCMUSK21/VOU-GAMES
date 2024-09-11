import { NextResponse } from "next/server";
import axios from "axios";
interface Token {
	accessToken: string;
}

// Hàm xử lý yêu cầu PUT tới /api/games/playsessions/end
export async function PUT(request: Request) {
	try {
		const body = await request.json();
<<<<<<< HEAD
		const { eventgameId, userId, endTime } = body;
=======
		const { gameId, userId, endTime } = body;
		const tokenString = sessionStorage.getItem('token');
		if (!tokenString) {
			throw new Error('Token not found');
		}
		const token: Token = JSON.parse(tokenString);
		const accessToken = token.accessToken;
>>>>>>> main

		if (!eventgameId || !userId || !endTime) {
			return NextResponse.json(
				{
					message:
						"Thiếu thông tin cần thiết (eventGameId, userId, hoặc endTime)",
				},
				{ status: 400 }
			);
		}

		const apiUrl = process.env.NEXT_PUBLIC_API_URL;

<<<<<<< HEAD
		const response = await axios.put(`${apiUrl}/api/v1/playsessions/end`, {
			eventgameId,
=======
		const response = await axios.put(`${apiUrl}/api/games/playsessions/end`, {
			gameId,
>>>>>>> main
			userId,
			endTime,
		}, {
			headers: {
				'Authorization': `Bearer ${accessToken}`
			},
			withCredentials: true
		});

		return NextResponse.json(
			{ message: "Thời gian kết thúc đã được cập nhật thành công" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Lỗi khi cập nhật thời gian kết thúc:", error);
		return NextResponse.json(
			{ message: "Có lỗi xảy ra khi cập nhật thời gian kết thúc" },
			{ status: 500 }
		);
	}
}
