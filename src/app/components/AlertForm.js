import React, { useState } from 'react';

const WeatherAlertForm = ({ email }) => {
    const [city, setCity] = useState('');
    const [parameter, setParameter] = useState('temperature');
    const [threshold, setThreshold] = useState('');
    const [direction, setDirection] = useState('above');

    const handleSubmitAlert = async () => {
        console.log(email);
        try {
            const message = "Message";
            const response = await fetch(
                `http://localhost:8080/api/alerts/${city}/${threshold}/${parameter}/${direction}/${message}/${email}`,
                {
                    method: 'POST',
                }
            );
            if (!response.ok) throw new Error("Error at sending alert");

            clearInputs();
        } catch (error) {
            alert("Could not send alert!");
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
                    Set Up a Weather Alert
                </h2>
                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label htmlFor="city" className="block text-gray-700 text-sm font-medium">
                            City
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
                            Weather Parameter
                        </label>
                        <select
                            id="parameter"
                            value={parameter}
                            onChange={(e) => setParameter(e.target.value)}
                            className="mt-2 text-gray-700 block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="temperature">Temperature</option>
                            <option value="humidity">Humidity</option>
                            <option value="pressure">Pressure</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="threshold" className="block text-gray-700 text-sm font-medium">
                            Threshold Value
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
                            Condition
                        </label>
                        <select
                            id="condition"
                            value={direction}
                            onChange={(e) => setDirection(e.target.value)}
                            className="mt-1 text-gray-700 block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="above">Above</option>
                            <option value="below">Below</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Set Alert
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WeatherAlertForm;
