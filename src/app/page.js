"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

import Navbar from "./components/Navbar";
import CityInput from "./components/CityInput";
import WeatherCard from "./components/WeatherCard";
import WeatherForm from "./components/WeatherForm";
import EmailForm from "./components/EmailForm";
import AlertForm from "./components/AlertForm";

import t from "./utils";

export default function Home() {
	const [city, setCity] = useState("");
	const [language, setLanguage] = useState("en");
	const [weatherData, setWeatherData] = useState(null);
	const [email, setEmail] = useState("");
	const [isSubscribed, setIsSubscribed] = useState(false);

	return (
		<div className="min-h-screen bg-gradient-to-br from-black to-blue-900 text-white">
			<Navbar language={language} setLanguage={setLanguage} />

			<div className="flex flex-col items-center mt-10">
				<h2 className="text-4xl font-bold mb-6">{t("home.title", language)}</h2>

				<CityInput language={language} city={city} setCity={setCity} />

				<WeatherForm language={language} city={city} setWeatherData={setWeatherData} />

				{weatherData && <WeatherCard weatherData={weatherData} language={language} />}

				{!isSubscribed && (
					<EmailForm
						email={email}
						setEmail={setEmail}
						onSubmit={() => {
							toast.success("You are now subscribed!");
							setIsSubscribed(true);
						}}
					/>
				)}

				{isSubscribed && <AlertForm email={email} />}
			</div>
		</div>
	);
}
