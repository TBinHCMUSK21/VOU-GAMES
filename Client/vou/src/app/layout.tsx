import type { Metadata } from "next";
import "./globals.css";
import { manrope } from "@/utils";

export const metadata: Metadata = {
	title: "Vou Game",
	description: "This is a real time game created by VOU team",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={manrope.className} suppressHydrationWarning={true}>
				{children}
			</body>
		</html>
	);
}
