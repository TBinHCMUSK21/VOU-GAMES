import { TMenuItem } from "@/types";
import ActiveLink from "./ActiveLink";

export function MenuItem({
	url = "/",
	title = "",
	icon,
	onlyIcon,
	className,
}: TMenuItem) {
	return (
		<li className={className}>
			<ActiveLink url={url}>
				{icon}
				{onlyIcon ? null : title}
			</ActiveLink>
		</li>
	);
}
