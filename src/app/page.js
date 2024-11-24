"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import CityInput from "./components/CityInput";
import WeatherCard from "./components/WeatherCard";
import WeatherForm from "./components/WeatherForm";

export default function Home() {
	const [city, setCity] = useState("");
	const [language, setLanguage] = useState("en");
	const [weatherData, setWeatherData] = useState(null);

	const handleFetchWeather = async () => {
		if (!city) return alert("Please select or enter a city!");

		try {
			const response = await fetch(
				`http://localhost:8080/api/weather/${city}/metric/${language}`
			);
			if (!response.ok) throw new Error("Failed to fetch weather data");
			const data = await response.json();
			setWeatherData(data);
		} catch (error) {
			alert("Error fetching weather data: " + error.message);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-black to-blue-900 text-white">

			<Navbar language={language} setLanguage={setLanguage} />

			<div className="flex flex-col items-center mt-10">
				<h2 className="text-4xl font-bold mb-6">Check Weather Conditions</h2>

				<CityInput city={city} setCity={setCity} />

				<WeatherForm handleFetchWeather={handleFetchWeather} />

				{weatherData && <WeatherCard weatherData={weatherData} />}
			</div>
		</div>
	);
}