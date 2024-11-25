import React from "react";
import t from "../utils";

const CityInput = ({ city, setCity, language }) => {
  return (
    <div className="flex items-center mb-6">
      <input
        type="text"
        placeholder={t("cityInput.enterCity", language)}
        className="p-3 rounded-lg w-45 text-black border border-gray-300 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <select
        className="p-3.5 rounded-lg min-w-[40px] w-auto text-black bg-white border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        value={city}
        onChange={(e) => {
          const selectedValue = e.target.value;
          setCity(selectedValue === "" ? document.querySelector('input[type="text"]').value : selectedValue);
        }}
        style={{ width: "auto", minWidth: "40px" }}
      >
        <option value="">{t("cityInput.enterCity", language)}</option>
        <option value="Tokyo">Tokyo</option>
        <option value="New York">New York</option>
        <option value="Paris">Paris</option>
        <option value="Berlin">Berlin</option>
      </select>
    </div>
  );
};

export default CityInput;