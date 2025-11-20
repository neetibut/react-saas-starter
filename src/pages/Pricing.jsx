import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export default function Pricing() {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  const handleSubscribe = () => {
    if (!isSignedIn) {
      navigate("/sign-in");
      return;
    }

    if (window.OmiseCard) {
      window.OmiseCard.configure({
        publicKey: import.meta.env.VITE_OMISE_PUBLIC_KEY,
      });

      window.OmiseCard.open({
        amount: 9900,
        currency: "USD",
        defaultPaymentMethod: "credit_card",
        onCreateTokenSuccess: (nonce) => {
          console.log("Token created:", nonce);
          // Simulate backend verification
          setTimeout(() => {
            alert("Payment Successful! Welcome to the course.");
            navigate("/dashboard");
          }, 1000);
        },
      });
    } else {
      console.error("OmiseCard not loaded");
      alert("Payment system is loading, please try again.");
    }
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Pricing Plans
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the plan that fits your learning journey.
          </p>
        </div>
        {/* Pricing cards will go here */}
        <div className="mt-16 flex justify-center">
          <div className="p-10 border rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold">Pro Bootcamp</h3>
            <p className="mt-4 text-3xl font-bold">
              $99
              <span className="text-base font-normal text-gray-500">
                /month
              </span>
            </p>
            <button
              onClick={handleSubscribe}
              className="mt-8 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
