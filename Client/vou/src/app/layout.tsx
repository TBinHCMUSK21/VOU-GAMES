import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { manrope } from "@/utils";
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning={true}>
				<body className={manrope.className} suppressHydrationWarning={true}>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
