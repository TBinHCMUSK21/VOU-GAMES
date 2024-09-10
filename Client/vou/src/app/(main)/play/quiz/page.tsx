"use client";
import { useState, useEffect, useCallback } from "react";
import IconMusic from "@/components/icons/IconMusic";
import IconTrophy from "@/components/icons/IconTrophy";
import { Question, QuizSearchParams } from "@/types";
import axios from "axios";
import PageNotFound from "@/app/not-found";

const Page = ({ searchParams }: { searchParams: QuizSearchParams }) => {
	const MAX_TIME = 5;

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [timeRemaining, setTimeRemaining] = useState(MAX_TIME);
	const [questions, setQuestions] = useState<Question[]>([]);
	const [isQuizCompleted, setIsQuizCompleted] = useState(false);
	const [answerStatus, setAnswerStatus] = useState<null | boolean>(null);
	const [showPopup, setShowPopup] = useState(false);
	const [popupTimer, setPopupTimer] = useState(5);
	const [waitingForOthers, setWaitingForOthers] = useState(false);
	const [isAnswered, setIsAnswered] = useState(false);
	const [earnedPoints, setEarnedPoints] = useState(0);
	const [score, setScore] = useState(0);
	const rank = 5;
	const [username, setUsername] = useState("Loading...");
	const [userId, setUserId] = useState(null);
	const [loading, setLoading] = useState(true); // To track loading state
	const [hasError, setHasError] = useState(false); // To track error state

	const { eventgameId } = searchParams;

	/* Gọi API để lấy dữ liệu người dùng */
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get("/api/user");
				setUserId(response.data.data.id);
				setUsername(response.data.data.name);
			} catch (error) {
				setHasError(true); // Set error state on failure
				console.error("Error fetching user data:", error);
			}
		};
		fetchUser();
	}, []);

	/* Gọi API để lấy dữ liệu câu hỏi */
	const fetchQuestions = useCallback(async () => {
		try {
			const response = await axios.get(`/api/quiz/${eventgameId}`);
			if (response.status !== 200 || !response.data.length) {
				setHasError(true); // Set error if no questions are found
			} else {
				setQuestions(response.data);
				setTimeRemaining(MAX_TIME);
				setLoading(false); // Set loading to false when done
			}
		} catch (error) {
			setHasError(true); // Set error state if the request fails
			console.error("Error fetching quiz questions:", error);
		}
	}, [eventgameId]);

	useEffect(() => {
		if (eventgameId) {
			fetchQuestions();
		} else {
			setHasError(true); // Handle missing eventgameId
		}
	}, [fetchQuestions, eventgameId]);

	/* Handle Answer Submission */
	const handleAnswerSubmit = useCallback(
		(answerId: number | null) => {
			if (!isQuizCompleted) {
				setIsAnswered(true);
				setWaitingForOthers(true);
				const isCorrect = questions[currentQuestionIndex]?.options.some(
					(option) => option.id === answerId && option.correct
				);
				if (isCorrect) {
					const maxPoints = 200;
					const pointsEarned = Math.floor(
						(timeRemaining / MAX_TIME) * maxPoints
					);
					setScore((prevScore) => prevScore + pointsEarned);
					setEarnedPoints(pointsEarned);
				}
				setAnswerStatus(isCorrect);
			}
		},
		[isQuizCompleted, questions, currentQuestionIndex, timeRemaining]
	);

	/* Chuyển câu hỏi tiếp theo */
	const handleNextQuestion = useCallback(() => {
		setCurrentQuestionIndex((prevIndex) => {
			if (prevIndex < questions.length - 1) {
				const nextIndex = prevIndex + 1;
				setTimeRemaining(MAX_TIME);
				setAnswerStatus(null);
				setShowPopup(false);
				setWaitingForOthers(false);
				setPopupTimer(5);
				setIsAnswered(false);
				return nextIndex;
			} else {
				setIsQuizCompleted(true);
				return prevIndex;
			}
		});
	}, [questions]);

	/* Đếm ngược thời gian cho câu hỏi */
	useEffect(() => {
		if (timeRemaining > 0) {
			const timer = setInterval(() => {
				setTimeRemaining((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(timer);
		} else if (timeRemaining === 0 && !isAnswered) {
			handleAnswerSubmit(null);
		}
	}, [timeRemaining, handleAnswerSubmit, isAnswered]);

	/* Xử lý đếm ngược thời gian chờ đợi */
	useEffect(() => {
		if (waitingForOthers && timeRemaining === 0) {
			setWaitingForOthers(false); // Đóng popup chờ khi hết thời gian
			setShowPopup(true); // Hiển thị popup kết quả
		}
	}, [waitingForOthers, timeRemaining]);

	/* Xử lý đếm ngược thời gian cho popup kết quả (5 giây) */
	useEffect(() => {
		if (showPopup) {
			const interval = setInterval(() => {
				setPopupTimer((prev) => prev - 1);
			}, 1000);

			const timeout = setTimeout(() => {
				handleNextQuestion();
			}, 5000);

			return () => {
				clearInterval(interval);
				clearTimeout(timeout);
			};
		}
	}, [showPopup, handleNextQuestion]);

	const handleCloseQuizCompletedPopup = async () => {
		if (!userId) {
			console.error("UserId không tồn tại, không thể gửi kết quả.");
			return;
		}
		const quizResult = {
			userId: userId,
			score: score,
			rank: rank,
			eventGameId: eventgameId,
		};
		try {
			await axios.post("/api/quiz/result", quizResult);

			await axios.put(`/api/playsessions/end`, {
				eventgameId: eventgameId,
				userId: userId,
				endTime: new Date().toISOString(),
			});
		} catch (error) {
			console.error("Gửi kết quả thất bại:", error);
		}
		setShowPopup(false);
		setIsQuizCompleted(false);
	};

	// Conditionally render based on loading and error states
	if (loading) {
		return <PageNotFound />;
	}

	if (hasError) {
		return <PageNotFound />;
	}

	const currentQuestion = questions[currentQuestionIndex];
	const totalQuestions = questions.length;

	const currentQuestionText = `${
		currentQuestionIndex + 1
	} of ${totalQuestions}`;
	return (
		<>
			<div className="flex flex-col items-center justify-start w-full">
				<div className="w-full max-w-lg mb-5 flex justify-between items-center fixed top-0 bg-white z-10 p-6">
					<span className="text-lg font-bold">{currentQuestionText}</span>
					<div className="flex items-center space-x-4">
						<div className="flex items-center rounded-lg px-4 py-2 bg-gray-200 text-gray-700">
							<IconTrophy className="w-5 h-5 mr-2 text-yellow-500" />
							<span className="text-base font-semibold">#{rank}</span>
						</div>
						<div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center">
							<span className="text-base font-semibold">
								{timeRemaining} seconds
							</span>
						</div>
					</div>
				</div>

				<div className="w-full overflow-y-scroll max-h-[calc(100vh-260px)] mt-[60px] scrollbar-hide">
					<div className="mb-3 w-full max-w-lg flex items-center justify-center min-h-[120px]">
						<div className="flex items-center justify-center w-full">
							<h1 className="text-xl font-bold text-center">
								{currentQuestion?.questionText}
							</h1>
						</div>
					</div>

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

					<div className="grid grid-cols-2 gap-4 w-full max-w-lg">
						{currentQuestion?.options.map((option, index) => (
							<button
								key={option.id}
								className={`text-white font-bold py-4 rounded-lg hover:opacity-90 transition h-[120px] flex items-center justify-center min-h-[80px] ${
									index === 0
										? "bg-red-500"
										: index === 1
										? "bg-blue-500"
										: index === 2
										? "bg-yellow-500"
										: "bg-green-500"
								}`}
								onClick={() => handleAnswerSubmit(option.id)}
							>
								{option.text}
							</button>
						))}
					</div>
				</div>
			</div>

			<div className="fixed bottom-[81px] left-0 w-full bg-white p-6 flex justify-between items-center z-50 pt-0">
				<span className="text-lg font-bold">{username}</span>
				<div className="bg-gray-800 text-white px-6 py-2 rounded-lg">
					{score}
				</div>
			</div>

			{/* Popup chờ đợi người chơi khác */}
			{waitingForOthers && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 w-full max-w-sm text-center shadow-lg">
						<h2 className="text-2xl font-bold mb-4 text-primary">
							Đang chờ người chơi khác...
						</h2>
						<p className="text-gray-700">Vui lòng đợi</p>
					</div>
				</div>
			)}

			{/* Popup kết quả */}
			{showPopup && !isQuizCompleted && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 w-full max-w-sm text-center shadow-lg">
						<h2
							className={`text-3xl font-bold mb-4 ${
								answerStatus ? "text-green-600" : "text-red-600"
							}`}
						>
							{answerStatus ? "🎉 Chính xác!" : "❌ Sai rồi!"}
						</h2>

						{/* Hiển thị điểm khi trả lời đúng */}
						{answerStatus && (
							<div className="flex justify-center items-center">
								<div className="bg-green-100 text-green-700 text-3xl font-bold rounded-full px-6 py-2 mt-3 mb-6 border-2 border-green-600 shadow-lg">
									+{earnedPoints} điểm
								</div>
							</div>
						)}
						<p className="text-gray-700 mb-5">
							Câu hỏi tiếp theo sau {popupTimer} giây...
						</p>
						<div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
							<div
								className="absolute h-full bg-blue-500 rounded-full"
								style={{ width: `${(popupTimer / 5) * 100}%` }}
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
							onClick={handleCloseQuizCompletedPopup}
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
