"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CompatClient } from "@stomp/stompjs";
import IconMusic from "@/components/icons/IconMusic";
import IconTrophy from "@/components/icons/IconTrophy";
import { Question, QuizSearchParams } from "@/types";

const mockQuestions: Question[] = [
	{
		id: 1,
		questionText: "Câu hỏi 1: Thủ đô của nước Anh là gì?",
		options: [
			{ id: 1, text: "Paris", color: "bg-red-500", isCorrect: false },
			{ id: 2, text: "London", color: "bg-blue-500", isCorrect: true },
			{ id: 3, text: "Berlin", color: "bg-yellow-500", isCorrect: false },
			{ id: 4, text: "Madrid", color: "bg-green-500", isCorrect: false },
		],
		timeRemaining: 10,
	},
	{
		id: 2,
		questionText: "Câu hỏi 2: Thủ đô của Nhật Bản là gì?",
		options: [
			{ id: 1, text: "Tokyo", color: "bg-red-500", isCorrect: true },
			{ id: 2, text: "Osaka", color: "bg-blue-500", isCorrect: false },
			{ id: 3, text: "Kyoto", color: "bg-yellow-500", isCorrect: false },
			{ id: 4, text: "Nagoya", color: "bg-green-500", isCorrect: false },
		],
		timeRemaining: 10,
	},
	{
		id: 3,
		questionText: "Câu hỏi 3: Nguyên tố nào có ký hiệu hóa học là 'O'?",
		options: [
			{ id: 1, text: "Oxygen", color: "bg-red-500", isCorrect: true },
			{ id: 2, text: "Gold", color: "bg-blue-500", isCorrect: false },
			{ id: 3, text: "Silver", color: "bg-yellow-500", isCorrect: false },
			{ id: 4, text: "Osmium", color: "bg-green-500", isCorrect: false },
		],
		timeRemaining: 10,
	},
];

const Page = ({ searchParams }: { searchParams: QuizSearchParams }) => {
	const { quiz } = searchParams;
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [timeRemaining, setTimeRemaining] = useState(
		mockQuestions[0].timeRemaining || 10
	);
	const [questions, setQuestions] = useState<Question[]>(mockQuestions);
	const [isQuizCompleted, setIsQuizCompleted] = useState(false);
	const [answerStatus, setAnswerStatus] = useState<null | boolean>(null); 
	const [showPopup, setShowPopup] = useState(false); 
	const [popupTimer, setPopupTimer] = useState(10); 
	const [isAnswered, setIsAnswered] = useState(false); 
	const popupRef = useRef<NodeJS.Timeout | null>(null);
	const stompClient = useRef<CompatClient | null>(null);

	// Giả lập điểm số và hạng của người dùng
	const score = 2035;
	const rank = 5;
	const username = "Lê Tuấn Bình";

	// Hàm xử lý câu trả lời
	const handleAnswerSubmit = useCallback(
		(answerId: number | null) => {
			// Nếu hết thời gian mà chưa trả lời thì tự động coi như sai
			let isCorrect = false;
			if (answerId !== null) {
				const selectedOption = questions[currentQuestionIndex].options.find(
					(option) => option.id === answerId
				);
				isCorrect = selectedOption?.isCorrect || false;
			}

			// Cập nhật trạng thái câu trả lời và hiển thị popup
			setAnswerStatus(isCorrect);
			setShowPopup(true);
			setIsAnswered(true);
		},
		[questions, currentQuestionIndex]
	);

	// Chuyển câu hỏi tiếp theo
	const handleNextQuestion = useCallback(() => {
		setCurrentQuestionIndex((prevIndex) => {
			if (prevIndex < questions.length - 1) {
				const nextIndex = prevIndex + 1;
				setTimeRemaining(questions[nextIndex].timeRemaining || 10);
				setAnswerStatus(null); 
				setShowPopup(false); 
				clearInterval(popupRef.current!); 
				setPopupTimer(10); 
				setIsAnswered(false); 
				return nextIndex;
			} else {
				setIsQuizCompleted(true);
				return prevIndex;
			}
		});
	}, [questions]);

	// Xử lý đếm ngược thời gian cho câu hỏi
	useEffect(() => {
		if (timeRemaining > 0 && !isAnswered) {
			const timer = setInterval(() => {
				setTimeRemaining((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(timer);
		} else if (timeRemaining === 0 && !isAnswered) {
			handleAnswerSubmit(null);
		}
	}, [timeRemaining, handleAnswerSubmit, isAnswered]);

	// Xử lý đếm ngược thời gian cho popup
	useEffect(() => {
		if (showPopup) {
			popupRef.current = setInterval(() => {
				setPopupTimer((prev) => prev - 1);
			}, 1000);

			const timeout = setTimeout(() => {
				handleNextQuestion();
			}, 10000); 

			return () => {
				if (popupRef.current) clearInterval(popupRef.current);
				clearTimeout(timeout);
			};
		}
	}, [showPopup, handleNextQuestion]);

	const currentQuestion = questions[currentQuestionIndex];
	const totalQuestions = questions.length;

	const currentQuestionText = `${
		currentQuestionIndex + 1
	} of ${totalQuestions}`;

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
							<IconTrophy className="w-5 h-5 mr-2 text-yellow-500" />
							<span className="text-base font-semibold">#{rank}</span>
						</div>
						{/* Thời gian còn lại */}
						<div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center">
							<span className="text-base font-semibold">
								{timeRemaining} seconds
							</span>
						</div>
					</div>
				</div>

				{/* Container cuộn với thanh cuộn ẩn */}
				<div className="w-full overflow-y-scroll max-h-[calc(100vh-260px)] mt-[60px] scrollbar-hide">
					{/* Nội dung câu hỏi */}
					<div className="mb-3 w-full max-w-lg flex items-center justify-center min-h-[120px]">
						<div className="flex items-center justify-center w-full">
							<h1 className="text-xl font-bold text-center">
								{currentQuestion?.questionText}
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
					<div className="grid grid-cols-2 gap-4 w-full max-w-lg">
						{currentQuestion?.options.map((option) => (
							<button
								key={option.id}
								className={`${option.color} text-white font-bold py-4 rounded-lg hover:opacity-90 transition break-words h-full flex items-center justify-center min-h-[80px]`}
								onClick={() => handleAnswerSubmit(option.id)}
							>
								{option.text}
							</button>
						))}
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

			{/* Popup hiển thị đúng/sai */}
			{showPopup && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 w-full max-w-sm text-center shadow-lg">
						<h2
							className={`text-3xl font-bold mb-4 ${
								answerStatus ? "text-green-600" : "text-red-600"
							}`}
						>
							{answerStatus ? "🎉 Chính xác!" : "❌ Sai rồi!"}
						</h2>
						<p className="text-gray-700 mb-5">
							Câu hỏi tiếp theo sau {popupTimer} giây...
						</p>
						<div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
							<div
								className="absolute h-full bg-blue-500 rounded-full"
								style={{ width: `${(popupTimer / 10) * 100}%` }}
							></div>
						</div>
					</div>
				</div>
			)}

			{/* Modal hoàn thành quiz */}
			{isQuizCompleted && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 w-full max-w-sm text-center shadow-lg">
						<h2 className="text-3xl font-bold mb-4 text-primary">
							🎉 Hoàn thành!
						</h2>
						<p className="text-gray-700 mb-5">Bạn đã hoàn thành bài quiz.</p>
						<div className="flex flex-col items-center mb-7">
							<div className="text-5xl font-bold text-primary mb-5">
								#{rank}
							</div>
							<div className="text-xl font-semibold text-gray-800">
								Điểm: {score}
							</div>
						</div>
						<button
							className="bg-blue-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
							onClick={() => {
								setIsQuizCompleted(false);
							}}
						>
							Đóng
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Page;
