import IconEvent from "@/components/icons/IconEvent";
import IconFavourite from "@/components/icons/IconFavourite";
import IconGift from "@/components/icons/IconGift";
import IconVoucher from "@/components/icons/IconVoucher";
import IconHome from "@/components/icons/IconHome";
import IconUser from "@/components/icons/IconUser";
import { TMenuItem } from "@/types/index.d";

export const menuItems: TMenuItem[] = [
	{
		url: "/",
		title: "VOU",
		icon: <IconHome className="size-5" />,
	},
	{
		url: "/event",
		title: "Sự kiện",
		icon: <IconEvent className="size-5" />,
	},
	{
		url: "/gift",
		title: "Đổi quà",
		icon: <IconGift className="size-5" />,
	},
	{
		url: "/history",
		title: "Bạn bè",
		icon: <IconUser className="size-5" />,
	},
	{
		url: "/user",
		title: "Voucher",
		icon: <IconVoucher className="size-5" />,
	},
	{
		url: "/favourite",
		title: "Yêu thích",
		icon: <IconFavourite className="size-5" />,
	},
];
