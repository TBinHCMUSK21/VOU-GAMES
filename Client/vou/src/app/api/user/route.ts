import { auth, WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

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
		const {
			id,
			email_addresses,
			username,
			image_url,
			phone_numbers,
			last_name,
			first_name,
		} = msg.data;

		const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users`;

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

		return NextResponse.json({
			message: "User created and data saved successfully",
		});
	}

	return new Response("OK", { status: 200 });
}

export async function GET(req: Request) {
	const { userId } = auth();
	console.log(userId);
	if (!userId) {
		return new Response("Unauthorized", { status: 401 });
	}

	const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users?userId=${userId}`;

	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
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
