import IconLeftArrow from "@/components/icons/IconLeftArrow";
import Link from "next/link";
const PageNotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="font-bold text-7xl">404</h1>
			<h2 className="mb-5">Page not found</h2>
			<Link href="/" className="flex items-center gap-2 hover:text-primary">
				<IconLeftArrow className="size-5" />
				Trang chủ
			</Link>
		</div>
	);
};

export default PageNotFound;
