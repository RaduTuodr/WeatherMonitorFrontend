import React from "react";
import { toast } from "react-hot-toast";

import { t, baseUrl } from "../utils";

const WeatherForm = ({ language, city, setWeatherData }) => {

    const handleFetchWeather = async () => {
        if (!city) {
            toast.error(t("weatherForm.noCityInput", language));
            return;
        }

        const toastId = toast.loading(t("weatherForm.obtainingInfo", language));
        try {
            const response = await fetch(
                `${baseUrl}/api/weather/${city}/metric/${language}`
            );
            if (!response.ok) throw new Error();

            const data = await response.json();
            setWeatherData(data);
            toast.success(t("weatherForm.weatherObtained", language), { id: toastId });
        } catch (error) {
            toast.error(t("weatherForm.error", language), { id: toastId });
        }
    };

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