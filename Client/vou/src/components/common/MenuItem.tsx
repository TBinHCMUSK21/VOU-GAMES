import { TMenuItem } from "@/types";
import ActiveLink from "./ActiveLink";

export function MenuItem({ url = "/", title = "", icon, onlyIcon }: TMenuItem) {
	return (
		<li>
			<ActiveLink url={url}>
				{icon}
				{onlyIcon ? null : title}
			</ActiveLink>
		</li>
	);
}
