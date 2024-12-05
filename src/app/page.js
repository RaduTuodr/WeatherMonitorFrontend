"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import Navbar from "./components/Navbar";
import CityInput from "./components/CityInput";
import WeatherCard from "./components/WeatherCard";
import WeatherForm from "./components/WeatherForm";
import LoginForm from "./components/LoginForm";
import AlertForm from "./components/AlertForm";
import SubscribeForm from "./components/SubscribeForm";

import { t } from './utils'

export default function Home() {
	const [city, setCity] = useState("");
	const [language, setLanguage] = useState("en");
	const [weatherData, setWeatherData] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubscribed, setIsSubscribed] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [token, setToken] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsAuthenticated(false);
		toast.success(t("home.loggedOutSuccessfully", language));
	};

	const handleLoginSuccess = () => {
		localStorage.setItem("token", token);
		setIsAuthenticated(true);
		toast.success(t("home.loggedInSuccessfully", language));
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-black to-blue-900 text-white">
			<Navbar language={language} setLanguage={setLanguage} handleLogout={handleLogout} isAuthenticated={isAuthenticated} />

			<div className="flex flex-col items-center mt-10">
				<h2 className="text-4xl font-bold mb-6">{t("home.title", language)}</h2>

				<CityInput language={language} city={city} setCity={setCity} />
				<WeatherForm language={language} city={city} setWeatherData={setWeatherData} />
				{weatherData && <WeatherCard language={language} weatherData={weatherData} />}

				{!isAuthenticated && <LoginForm
					language={language}
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
					setToken={setToken}
					onLoginSuccess={handleLoginSuccess}
				/>}

				{isAuthenticated && !isSubscribed && <SubscribeForm language={language} onSubmit={() => { setIsSubscribed(true) }} />}

				{isAuthenticated && isSubscribed && <AlertForm language={language} email={email} token={token} />}
			</div>
		</div>
	);
}
