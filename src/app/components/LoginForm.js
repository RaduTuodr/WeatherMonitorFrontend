import { Input } from "@nextui-org/input";
import { useState } from "react";
import toast from "react-hot-toast";
import t from "../utils";

const LoginForm = ({ language, email, setEmail, password, setPassword, setToken, onLoginSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            toast.error(t("loginForm.enterValidEmail", language));
            return;
        }
        if (!password) {
            toast.error(t("loginForm.passwordToast", language));
            return;
        }

        setIsLoading(true);

        try {
            const endpoint = isSignUp
                ? `http://localhost:8080/api/auth/signup/${email}`
                : `http://localhost:8080/api/auth/login/${email}`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            if (!response.ok)
                throw new Error(t("loginForm.errorToast", language));

            const token = await response.json();

            if (isSignUp) {
                toast.success(t("loginForm.signUpSuccessfully", language));
            } else {
                if (token) {
                    setToken(token);
                    setEmail(email);
                    onLoginSuccess(token);
                } else {
                    throw new Error('No token received');
                }
            }

            setIsLoading(false);
        } catch (error) {
            toast.error((isSignUp ? t("loginForm.signUpFailed", language) : t("loginForm.loginFailed", language)));
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-sm mx-auto my-12 bg-white p-6 rounded-lg shadow-lg">
            <h5 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                {isSignUp ? t("loginForm.signUp", language) : t("loginForm.logIn", language)}
            </h5>
            <p className="text-center text-gray-600 mb-6">
                {isSignUp
                    ? t("loginForm.createAccountMsg", language)
                    : t("loginForm.enterEmailMsg", language)}
            </p>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Input
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="max-w-xs"
                    />
                </div>
                <div className="mb-4">
                    <Input
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="max-w-xs"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        id="toggleSignUp"
                        checked={isSignUp}
                        onChange={(e) => setIsSignUp(e.target.checked)}
                        className="mr-2"
                    />
                    <label htmlFor="toggleSignUp" className="text-gray-600">
                        {isSignUp ? t("loginForm.switchLogin", language) : t("loginForm.switchSignup", language)}
                    </label>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-blue-500'} text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
                >
                    {isLoading ? (isSignUp ? t("loginForm.signingUp", language) : t("loginForm.loggingIn", language))
                        : (isSignUp ? t("loginForm.signUp", language) : t("loginForm.logIn", language))}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
