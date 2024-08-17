import { SignUp } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="h-screen p-10 flex item-center justify-center">
			<SignUp />
		</div>
	);
}
