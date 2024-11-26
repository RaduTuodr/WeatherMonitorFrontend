import { Input } from "@nextui-org/input";

const EmailForm = ({ email, setEmail, onSubmit }) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        onSubmit();
    };

    return (
        <div className="max-w-sm mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg">
            <h5 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                Stay Updated
            </h5>
            <p className="text-center text-gray-600 mb-6">
                Subscribe to receive regular alerts directly in your inbox.
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
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default EmailForm;
