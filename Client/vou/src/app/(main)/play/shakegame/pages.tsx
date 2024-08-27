const page = ({
	searchParams,
}: {
	searchParams: {
		shakegame: string;
		brand: string;
		event: string;
	};
}) => {
	const { brand, event, shakegame } = searchParams;
	return <div></div>;
};

export default page;
