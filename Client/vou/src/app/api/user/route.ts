import { auth, WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import axios, { AxiosResponse } from 'axios';

export async function POST(req: Request) {
	const svix_id = headers().get("svix-id") ?? "";
	const svix_timestamp = headers().get("svix-timestamp") ?? "";
	const svix_signature = headers().get("svix-signature") ?? "";

	if (!process.env.WEBHOOK_SECRET) {
		throw new Error("WEBHOOK_SECRET is not set");
	}

	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Bad Request", { status: 400 });
	}

	const payload = await req.json();
	const body = JSON.stringify(payload);

	const sivx = new Webhook(process.env.WEBHOOK_SECRET);

	let msg: WebhookEvent;

	try {
		msg = sivx.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		return new Response("Bad Request", { status: 400 });
	}

	const eventType = msg.type;
	if (eventType === "user.created") {
		console.log("Đã tạo user");

		const {
			id,
			email_addresses,
			username,
			image_url,
			phone_numbers,
			last_name,
			first_name,
			password
		} = msg.data;

		const url = `${process.env.NEXT_PUBLIC_API_URL}/api/games/users`;

		// Sử dụng giá trị mặc định nếu các trường không tồn tại
		const email = email_addresses?.[0]?.email_address ?? "";
		const avatar = image_url ?? "";
		const name = `${first_name ?? ""} ${last_name ?? ""}`.trim();
		const phoneNumber = phone_numbers?.[0]?.phone_number ?? "";
		const createdAt = new Date().toISOString();

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				clerkId: id,
				avatar: avatar,
				createdAt: createdAt,
				dob: null,
				email: email,
				gender: null,
				name: name,
				phoneNumber: phoneNumber,
				role: "USER",
				username: username ?? "",
			}),
		});

		if (!response.ok) {
			return new Response("Failed to save user data", { status: 500 });
		}

		const requestBody = {
			email: email,
			username: username ?? generateRandomString(50),
			password: password ?? generateRandomString(50),
			phoneNumber: phoneNumber,
			role: "USER",
			status: "ACTIVE"
		}

		const responseAccount = await axios.post(`http://localhost:1110/api/v1/authentication/accounts/register`, requestBody);
		console.log("responseAccount", responseAccount);

		return NextResponse.json({
			message: "User created and data saved successfully",
		});
	}

	return new Response("OK", { status: 200 });
}

function generateRandomString(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	const charactersLength = characters.length;

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

interface Token {
	accessToken: string;
}

export async function GET(req: Request) {
	const { userId } = auth();
	console.log(userId);
	if (!userId) {
		return new Response("Unauthorized", { status: 401 });
	}

	const url = `${process.env.NEXT_PUBLIC_API_URL}/api/games/users?userId=${userId}`;

	const tokenString = sessionStorage.getItem('token');
	if (!tokenString) {
		throw new Error('Token not found');
	}
	const token: Token = JSON.parse(tokenString);
	const accessToken = token.accessToken;

	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${accessToken}`
			},
		});

		if (!response.ok) {
			return new Response("Failed to fetch user data", { status: 500 });
		}

		const userData = await response.json();

		return NextResponse.json({
			message: "User data fetched successfully",
			data: userData,
		});
	} catch (error) {
		return new Response("Failed to fetch user data", { status: 500 });
	}
}
