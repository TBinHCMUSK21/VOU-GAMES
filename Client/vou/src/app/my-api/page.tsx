"use client";

import { useState } from "react";

export default function SendHelloPage() {
	const [responseMessage, setResponseMessage] = useState<string | null>(null);

	const handleSendHello = async () => {
		try {
			const response = await fetch("/api/my-api", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();

			if (data.success) {
				setResponseMessage("Message sent successfully!");
			} else {
				setResponseMessage("Failed to send message.");
			}
		} catch (error) {
			console.error("Error:", error);
			setResponseMessage("An error occurred.");
		}
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
			}}
		>
			<button
				onClick={handleSendHello}
				style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
			>
				Send Hello to Spring Boot
			</button>
			{responseMessage && <p>{responseMessage}</p>}
		</div>
	);
}
