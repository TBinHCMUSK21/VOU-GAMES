export type TMenuItem = {
	url: string;
	title: string;
	icon: React.ReactNode;
	onlyIcon?: boolean;
	className?: string;
};
export type TActiveLinkProps = {
	url: string;
	children: React.ReactNode;
};
