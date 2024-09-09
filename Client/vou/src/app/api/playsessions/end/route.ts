import { NextResponse } from "next/server";
import axios from "axios";

// Hàm xử lý yêu cầu PUT tới /api/playsessions/end
export async function PUT(request: Request) {
	try {
		const body = await request.json();
		const { eventGameId, userId, endTime } = body;

		if (!eventGameId || !userId || !endTime) {
			return NextResponse.json(
				{
					message:
						"Thiếu thông tin cần thiết (eventGameId, userId, hoặc endTime)",
				},
				{ status: 400 }
			);
		}

		const apiUrl = process.env.NEXT_PUBLIC_API_URL;

		const response = await axios.put(`${apiUrl}/api/playsessions/end`, {
			eventGameId,
			userId,
			endTime,
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
