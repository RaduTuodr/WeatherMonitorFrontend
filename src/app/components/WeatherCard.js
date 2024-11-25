import React from "react";
import t from "../utils";

const WeatherCard = ({ weatherData, language }) => {
    return (
        <div className="mt-10 bg-white text-black p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-bold mb-4">{weatherData.city}</h3>
            <p>{t("weatherCard.temperature", language)}: {weatherData.temperature}°C</p>
            <p>{t("weatherCard.humidity", language)}: {weatherData.humidity}%</p>
            <p>{t("weatherCard.pressure", language)}: {weatherData.pressure} hPa</p>
            <p>{t("weatherCard.description", language)}: {weatherData.description}</p>
            <p>{t("weatherCard.timezone", language)}: {weatherData.timezone}</p>
        </div>
    );
};

export default WeatherCard;