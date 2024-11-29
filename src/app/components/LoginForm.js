import { Input } from "@nextui-org/input";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginForm = ({ email, setEmail, password, setPassword, setToken, onLoginSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        if (!password) {
            toast.error("Password cannot be empty.");
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

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData.message);
                throw new Error(errorData.message || 'An error occurred');
            }

            const token = await response.json();

            if (isSignUp) {
                toast.success('Sign-up successful! You can now log in.');
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
            console.log(error.message);
            toast.error(error.message || (isSignUp ? 'Sign-up failed' : 'Login failed'));
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-sm mx-auto my-12 bg-white p-6 rounded-lg shadow-lg">
            <h5 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                {isSignUp ? 'Sign Up' : 'Login'}
            </h5>
            <p className="text-center text-gray-600 mb-6">
                {isSignUp
                    ? 'Create an account to start using our services.'
                    : 'Enter your email and password to log in.'}
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
                        {isSignUp ? 'Switch to Login' : 'Sign Up Instead'}
                    </label>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-blue-500'} text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
                >
                    {isLoading ? (isSignUp ? 'Signing up...' : 'Logging in...') : (isSignUp ? 'Sign Up' : 'Login')}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
