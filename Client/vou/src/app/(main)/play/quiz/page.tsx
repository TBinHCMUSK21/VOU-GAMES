"use client";
import IconMusic from "@/components/icons/IconMusic";
import IconTrophy from "@/components/icons/IconTrophy";
import { useState } from "react";

const Page = ({
	searchParams,
}: {
	searchParams: { quiz: string; brand: string; event: string };
}) => {
	const { quiz, brand, event } = searchParams;

	const questions = [
		{
			id: 1,
			questionText: "Câu hỏi 1: Thủ đô của nước Anh là gì?",
			options: [
				{
					id: 1,
					text: "Paris",
					color: "bg-red-500",
				},
				{ id: 2, text: "London", color: "bg-blue-500" },
				{ id: 3, text: "Berlin", color: "bg-yellow-500" },
				{ id: 4, text: "Madrid", color: "bg-green-500" },
			],
		},
		{
			id: 2,
			questionText: "Câu hỏi 2: Thủ đô của Nhật Bản là gì?",
			options: [
				{ id: 1, text: "Tokyo", color: "bg-red-500" },
				{ id: 2, text: "Osaka", color: "bg-blue-500" },
				{ id: 3, text: "Kyoto", color: "bg-yellow-500" },
				{ id: 4, text: "Nagoya", color: "bg-green-500" },
			],
		},
		{
			id: 3,
			questionText: "Câu hỏi 3: Nguyên tố nào có ký hiệu hóa học là 'O'?",
			options: [
				{ id: 1, text: "Oxygen", color: "bg-red-500" },
				{ id: 2, text: "Gold", color: "bg-blue-500" },
				{ id: 3, text: "Silver", color: "bg-yellow-500" },
				{ id: 4, text: "Osmium", color: "bg-green-500" },
			],
		},
	];

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	const handleNextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	const handlePreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	const currentQuestion = questions[currentQuestionIndex];
	const totalQuestions = questions.length;

	const username = "Lê Tuấn Bình";
	const score = 2035;
	const currentQuestionText = `${
		currentQuestionIndex + 1
	} of ${totalQuestions}`;
	const timeRemaining = "00:45";

	return (
		<>
			{/* Thông tin câu hỏi */}
			<div className="flex flex-col items-center justify-start w-full">
				{/* Phần thông tin phía trên câu hỏi cố định */}
				<div className="w-full max-w-lg mb-5 flex justify-between items-center fixed top-0 bg-white z-10 p-6">
					{/* Số câu hỏi */}
					<span className="text-lg font-bold">{currentQuestionText}</span>

					{/* Phần chứa icon cúp và thời gian */}
					<div className="flex items-center space-x-4">
						{/* Biểu tượng cúp */}
						<div className="flex items-center rounded-lg px-4 py-2 bg-gray-200 text-gray-700">
							<IconTrophy className="w-5 h-5 mr-2 text-yellow-500"></IconTrophy>
							<span className="text-base font-semibold">#5</span>
						</div>
						{/* Thời gian còn lại */}
						<div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center">
							<span className="text-base  font-semibold">{timeRemaining}</span>
						</div>
					</div>
				</div>

				{/* Container cuộn với thanh cuộn ẩn */}
				<div className="w-full overflow-y-scroll max-h-[calc(100vh-260px)] mt-[60px] scrollbar-hide">
					{/* Nội dung câu hỏi */}
					<div className=" mb-3 w-full max-w-lg flex items-center justify-center min-h-[120px]">
						<div className="flex items-center justify-center w-full">
							<h1 className="text-xl font-bold text-center">
								{currentQuestion.questionText}
							</h1>
						</div>
					</div>

					{/* Icon phát âm thanh */}
					<div className="relative w-full h-56 bg-gray-300 mb-10 flex items-center justify-center rounded-lg">
						<span className="text-gray-700">Hình ảnh</span>
						<button
							className="absolute inset-0 m-auto size-11 rounded-full flex items-center justify-center bg-gray-800 bg-opacity-70 text-white transition duration-200"
							aria-label="Phát âm thanh"
							style={{ width: "50px", height: "50px" }}
						>
							<IconMusic className="size-6" />
						</button>
					</div>

					{/* Đáp án */}
					<div className="grid grid-cols-2 gap-4 w-full max-w-lg ">
						{currentQuestion.options.map((option) => (
							<button
								key={option.id}
								className={`${option.color} text-white font-bold py-4 rounded-lg hover:opacity-90 transition break-words h-full flex items-center justify-center min-h-[80px]`}
							>
								{option.text}
							</button>
						))}
					</div>

					{/* Nút điều hướng */}
					<div className="flex justify-between mt-8 w-full max-w-lg mb-5">
						<button
							onClick={handlePreviousQuestion}
							className={`py-2 px-4 rounded-lg bg-gray-300 text-gray-700 font-bold ${
								currentQuestionIndex === 0
									? "opacity-50 cursor-not-allowed"
									: "hover:bg-gray-400"
							}`}
							disabled={currentQuestionIndex === 0}
						>
							Quay lại
						</button>
						<button
							onClick={handleNextQuestion}
							className={`py-2 px-4 rounded-lg bg-primary text-white font-bold ${
								currentQuestionIndex === questions.length - 1
									? "opacity-50 cursor-not-allowed"
									: ""
							}`}
							disabled={currentQuestionIndex === questions.length - 1}
						>
							Tiếp theo
						</button>
					</div>
				</div>
			</div>

			{/* Thông tin người dùng và điểm số cố định ở phía dưới */}
			<div className="fixed bottom-[81px] left-0 w-full bg-white p-6 flex justify-between items-center z-50 pt-0">
				{/* Tên người dùng */}
				<span className="text-lg font-bold">{username}</span>
				{/* Điểm số */}
				<div className="bg-gray-800 text-white px-6 py-2 rounded-lg">
					{score}
				</div>
			</div>
		</>
	);
};

export default Page;
