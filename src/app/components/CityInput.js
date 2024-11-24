import React from "react";

const CityInput = ({ city, setCity }) => {
  return (
    <div className="flex items-center mb-6">
      <input
        type="text"
        placeholder="Enter city"
        className="p-3 rounded-lg w-45 text-black border border-gray-300 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <select
        className="p-3.5 rounded-lg w-40 text-black bg-white border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        value={city}
        onChange={(e) => {
          const selectedValue = e.target.value;
          setCity(selectedValue === "" ? document.querySelector('input[type="text"]').value : selectedValue);
        }}
      >
        <option value="">Select a City</option>
        <option value="Tokyo">Tokyo</option>
        <option value="New York">New York</option>
        <option value="Paris">Paris</option>
        <option value="Berlin">Berlin</option>
      </select>
    </div>
  );
};

export default CityInput;
