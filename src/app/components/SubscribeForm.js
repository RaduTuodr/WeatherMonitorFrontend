import { toast } from "react-hot-toast";
import t from "../utils";

const SubscribeForm = ({ onSubmit, language }) => {

    const handleSubmit = () => {
        toast.success(t("subscribeForm.subscribeSuccessfully", language));
        onSubmit();
    }

    return (
        <div className="max-w-sm mx-auto my-12 bg-white p-6 rounded-lg shadow-lg">
            <h5 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                {t("subscribeForm.title", language)}
            </h5>
            <p className="text-center text-gray-600 mb-6">
                {t("subscribeForm.subscribeMsg", language)}
            </p>
            <form onSubmit={handleSubmit}>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                    {t("subscribeForm.subscribe", language)}
                </button>
            </form>
        </div>
    );
};

export default SubscribeForm;