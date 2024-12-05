import React, { useState } from 'react';
import { toast } from "react-hot-toast";

import { t, baseUrl } from "../utils";


const AlertForm = ({ email, token, language }) => {

    const [city, setCity] = useState('');
    const [parameter, setParameter] = useState('temperature');
    const [threshold, setThreshold] = useState('');
    const [direction, setDirection] = useState('above');

    const handleSubmitAlert = async () => {

        const toastId = toast.loading(t("alertForm.creatingAlert", language));
        try {
            const response = await fetch(
                `${baseUrl}/api/alerts/${city}/${threshold}/${parameter}/${direction}/${email}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token })
                }
            );

            if (!response.ok) throw new Error(t("alertForm.alertError", language));

            toast.success(t("alertForm.alertSuccess", language), { id: toastId })
            clearInputs();
        } catch (error) {
            alert(t("alertForm.alertError", language));
        }
    };

    const clearInputs = () => {
        setCity('');
        setParameter('temperature');
        setThreshold('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSubmitAlert();
    };

    return (
        <div className="flex justify-center items-center my-12">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-xl">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    {t("alertForm.title", language)}
                </h2>
                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label htmlFor="city" className="block text-gray-700 text-sm font-medium">
                            {t("alertForm.city", language)}
                        </label>
                        <input
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter a city"
                            className="mt-1 text-gray-700 block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="parameter" className="block text-gray-700 text-sm font-medium">
                            {t("alertForm.weatherParameter", language)}
                        </label>
                        <select
                            id="parameter"
                            value={parameter}
                            onChange={(e) => setParameter(e.target.value)}
                            className="mt-2 text-gray-700 block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="temperature">{t("alertForm.temperature", language)}</option>
                            <option value="humidity">{t("alertForm.humidity", language)}</option>
                            <option value="pressure">{t("alertForm.pressure", language)}</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="threshold" className="block text-gray-700 text-sm font-medium">
                            {t("alertForm.thresholdValue", language)}
                        </label>
                        <div className="relative">
                            <input
                                id="threshold"
                                type="number"
                                value={threshold}
                                onChange={(e) => setThreshold(e.target.value)}
                                placeholder="Enter a value"
                                step="0.1"
                                className="mt-1 text-gray-700 block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            <span
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                            >
                                {parameter === 'temperature'
                                    ? '°C'
                                    : parameter === 'humidity'
                                        ? '%'
                                        : 'hPa'}
                            </span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="condition" className="block text-gray-700 text-sm font-medium">
                            {t("alertForm.condition", language)}
                        </label>
                        <select
                            id="condition"
                            value={direction}
                            onChange={(e) => setDirection(e.target.value)}
                            className="mt-1 text-gray-700 block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="above">{t("alertForm.above", language)}</option>
                            <option value="below">{t("alertForm.below", language)}</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {t("alertForm.setAlert", language)}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AlertForm;
