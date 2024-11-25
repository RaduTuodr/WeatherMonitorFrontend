import React from "react";
import t from "../utils";

const WeatherForm = ({ handleFetchWeather, language }) => {
    return (
        <div>
            <button
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
                onClick={handleFetchWeather}
            >
                {t("weatherForm.fetchWeather", language)}
            </button>
        </div>
    );
};

export default WeatherForm;