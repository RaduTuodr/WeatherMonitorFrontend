import React from "react";

const WeatherForm = ({ handleFetchWeather }) => {
    return (
        <div>
            <button
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
                onClick={handleFetchWeather}
            >
                Fetch Weather
            </button>
        </div>
    );
};

export default WeatherForm;
