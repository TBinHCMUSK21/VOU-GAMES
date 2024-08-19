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
			className={`p-3 rounded-md flex items-center gap-3 dark:text-grayDark transition-all text-base font-semibold ${
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
