import React from "react";

const WeatherCard = ({ weatherData }) => {
    return (
        <div className="mt-10 bg-white text-black p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-bold mb-4">{weatherData.city}</h3>
            <p>Temperature: {weatherData.temperature}°C</p>
            <p>Humidity: {weatherData.humidity}%</p>
            <p>Pressure: {weatherData.pressure} hPa</p>
            <p>Description: {weatherData.description}</p>
            <p>Timezone: {weatherData.timezone}</p>
        </div>
    );
};

export default WeatherCard;