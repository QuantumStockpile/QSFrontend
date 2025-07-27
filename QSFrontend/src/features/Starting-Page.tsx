import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    navigate("/login");
  };
  const handleSignUpRedirect = () => {
    navigate("/sign-up");
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome!</h2>
      <p className="text-gray-700 mb-8">Please choose an option to continue.</p>
      <div className="space-y-4">
        <Button
          variant="link"
          size="sm"
          onClick={handleLoginRedirect}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 shadow-md"
        >
          Log In
        </Button>
        <Button
          variant="link"
          size="sm"
          onClick={handleSignUpRedirect}
          className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 shadow-md"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
