"use client";
import { TActiveLinkProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({ url, children }: TActiveLinkProps) => {
	const pathName = usePathname();
	const isActive = url === pathName;
	return (
		<Link
			href={url}
			className={`p-2 rounded-md flex items-center justify-center flex-col gap-2 text-center transition-all text-xs font-semibold ${
				isActive
					? "!text-primary bg-primary bg-opacity-10 svg-animate font-medium"
					: "hover:!text-primary hover:!bg-primary hover:!bg-opacity-10"
			} `}
		>
			{children}
		</Link>
	);
};

export default ActiveLink;
