"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import UserService from "@/app/api/user/route";
import { HttpStatusCode } from "axios";
import axios from "axios";

const Page = () => {
	const { isSignedIn, getToken } = useAuth();
	const router = useRouter();
	const { user } = useUser();
	const [token, setToken] = useState({
		accessToken: "",
		refreshToken: "",
		accessTokenExpiresAt: "",
	});

	const fetchUser = useCallback(async () => {
		const tokenString = sessionStorage.getItem("token");
		if (tokenString && user) {
			const parsedToken = JSON.parse(tokenString);
			const accessToken = parsedToken.accessToken;
			console.log("accessToken: ", accessToken);
			try {
				const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/games/users/info?username=${user.username}`, {
					headers: {
						'Authorization': `Bearer ${accessToken}`
					},
					withCredentials: true
				});
				console.log("fetch user: ", response.data);

				sessionStorage.setItem("userId", response.data.id);

			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		}
	}, [user]);

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	const login = useCallback(async () => {
		if (isSignedIn && user) {
			try {
				const requestBody = {
					username: user.username,
					password: 'password123',
				};
				const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/authentication/accounts/login`, requestBody);
				console.log("response login: ", response);
				if (response.status === HttpStatusCode.Ok) {
					const { accessToken, refreshToken, accessTokenExpiresAt } = response.data;
					const newToken = { accessToken, refreshToken, accessTokenExpiresAt };
					setToken(newToken);
					sessionStorage.setItem("token", JSON.stringify(newToken));
				}
			} catch (error) {
				console.log("Login failed!", error);
			}
		}
	}, [user]);

	useEffect(() => {
		if (isSignedIn) {
			console.log("User logged in successfully!");
			if (user) {
				console.log("user: ", user);
			}
			login().then(r => {
				const tokenString = sessionStorage.getItem("token");
				if (tokenString) {
					const parsedToken = JSON.parse(tokenString);
					const accessToken = parsedToken.accessToken;
					console.log("accessToken: ", accessToken);
				}
			});
		} else {
			router.push("/sign-in");
		}
	}, [isSignedIn, login]);

	if (!isSignedIn) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div>Trang chủ của hệ thống</div>
		</>
	);
};

export default Page;
