import { WebhookEvent } from "@clerk/nextjs/server";
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

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				clerkId: id,
				avatar: image_url,
				createdAt: new Date().toISOString(),
				dob: null,
				email: email_addresses[0].email_address,
				gender: null,
				name: (last_name ?? "") + " " + (first_name ?? ""),
				phoneNumber:
					phone_numbers && phone_numbers.length > 0 ? phone_numbers[0] : "",
				role: "USER",
				username: username,
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
