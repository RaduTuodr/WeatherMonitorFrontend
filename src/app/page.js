"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import CityInput from "./components/CityInput";
import WeatherCard from "./components/WeatherCard";
import WeatherForm from "./components/WeatherForm";
import EmailForm from "./components/EmailForm";
import t from "./utils";
import AlertForm from "./components/AlertForm";

export default function Home() {
	const [city, setCity] = useState("");
	const [language, setLanguage] = useState("en");
	const [weatherData, setWeatherData] = useState(null);
	const [email, setEmail] = useState("");
	const [isSubscribed, setIsSubscribed] = useState(false);

	const handleFetchWeather = async () => {
		if (!city) return alert(t("home.noCityInput", language));

		try {
			const response = await fetch(
				`http://localhost:8080/api/weather/${city}/metric/${language}`
			);
			if (!response.ok) throw new Error(t("home.fetchWeatherError", language));
			const data = await response.json();
			setWeatherData(data);
		} catch (error) {
			alert(t("home.fetchWeatherError", language));
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-black to-blue-900 text-white">
			<Navbar language={language} setLanguage={setLanguage} />

			<div className="flex flex-col items-center mt-10">
				<h2 className="text-4xl font-bold mb-6">{t("home.title", language)}</h2>

				<CityInput language={language} city={city} setCity={setCity} />

				<WeatherForm language={language} handleFetchWeather={handleFetchWeather} />

				{weatherData && <WeatherCard weatherData={weatherData} language={language} />}

				{!isSubscribed && (
					<EmailForm
						email={email}
						setEmail={setEmail}
						onSubmit={() => setIsSubscribed(true)}
					/>
				)}

				{isSubscribed && <AlertForm email={email} />}
			</div>
		</div>
	);
}
