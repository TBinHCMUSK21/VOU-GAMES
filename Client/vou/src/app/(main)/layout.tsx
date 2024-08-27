import { MenuItem } from "@/components/common/MenuItem";
import { menuItems } from "@/constants";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<ul className="flex p-2 bg-white border-t border-gray-200 lg:hidden fixed bottom-0 left-0 w-full justify-center gap-0 h-30 z-50">
				{menuItems.map((item, index) => (
					<MenuItem
						className="flex-1 text-center"
						key={index}
						url={item.url}
						title={item.title}
						icon={item.icon}
					></MenuItem>
				))}
			</ul>
			<div className="hidden lg:block"></div>
			<main className="p-6 pb-[calc(30px + 81px)]">{children}</main>
		</>
	);
};

export default Layout;
