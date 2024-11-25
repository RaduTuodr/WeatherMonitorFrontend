import React from "react";
import t from "../utils";

const Navbar = ({ language, setLanguage }) => {
    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-blue-900 p-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <img src="logo.png" alt="icon" className="w-10 h-10 rounded-full" />
                    <h1 className="text-white text-2xl font-semibold">{t("navbar.title", language)}</h1>
                </div>

                <div className="relative">
                    <select
                        id="language"
                        className="bg-white text-black rounded-lg py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="en">{t("navbar.english", language)}</option>
                        <option value="ro">{t("navbar.romanian", language)}</option>
                        <option value="fr">{t("navbar.french", language)}</option>
                        <option value="es">{t("navbar.spanish", language)}</option>
                        <option value="de">{t("navbar.german", language)}</option>
                    </select>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;