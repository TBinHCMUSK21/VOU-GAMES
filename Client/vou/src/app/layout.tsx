import type { Metadata } from "next";
import "./globals.css";
import { manrope } from "@/utils";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
	title: "VOU",
	description: "Trying to Playing With Your Friend.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
			appearance={{
				layout: {
					unsafe_disableDevelopmentModeWarnings: true,
				},
			}}
		>
			<html lang="en" suppressHydrationWarning={true}>
				<body className={manrope.className} suppressHydrationWarning={true}>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
