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
export type QuizSearchParams = {
	quiz: string;
	eventgameId: string;
};

export type Option = {
	id: number;
	text: string;
	color: string;
	correct: boolean;
};

export type Question = {
	id: number;
	questionText: string;
	options: Option[];
	timeRemaining?: number;
};

export type QuizResult = {
	nextQuestion?: Question;
	correct?: boolean;
};

export type QuizAnswer = {
	questionId: number;
	answerId: number;
	userId: string;
};
