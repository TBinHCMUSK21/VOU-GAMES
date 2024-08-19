import { MenuItem } from "@/components/common/MenuItem";
import { menuItems } from "@/constants";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<ul className="flex p-3 bg-white border-t border-gray-200 lg:hidden fixed bottom-0 left-0 w-full justify-center gap-5 h-16 z-50">
				{menuItems.map((item, index) => (
					<MenuItem
						key={index}
						url={item.url}
						title={item.title}
						icon={item.icon}
						onlyIcon
					></MenuItem>
				))}
			</ul>
			<div className="hidden lg:block"></div>
			<main className="p-5">{children}</main>
		</>
	);
};
export default layout;
