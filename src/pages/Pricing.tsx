import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

type PricingPlan = {
  name: string;
  price: number;
  currency: string;
  interval: string;
};

type OmiseTokenCallback = (nonce: string) => void;

type CheckoutResponse = { success: boolean; message?: string };

export default function Pricing() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isSignedIn, getToken } = useAuth();

  const showPremiumMessage = searchParams.get("reason") === "premium_required";

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
        amount: 290000,
        currency: "THB",
        defaultPaymentMethod: "credit_card",
        onCreateTokenSuccess: (async (nonce: string) => {
          // console.log("Token created:", nonce);

          try {
            const token = await getToken();
            const res = await fetch("/api/checkout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                token: nonce,
              }),
            });

            const data: CheckoutResponse = await res.json();

            if (data.success) {
              alert("Payment Successful! Welcome to the course.");
              navigate("/dashboard");
            } else {
              alert("Payment failed: " + (data.message || "Unknown error"));
            }
          } catch (err) {
            console.error("Payment error:", err);
            alert("An error occurred during payment processing.");
          }
        }) as OmiseTokenCallback,
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
          {showPremiumMessage && (
            <div className="mt-6 rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Access Restricted
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      You need an active subscription to view that content.
                      Please subscribe below.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Pricing cards will go here */}
        <div className="mt-16 flex justify-center">
          {[
            {
              name: "Pro Bootcamp",
              price: 2900,
              currency: "THB",
              interval: "month",
            },
          ].map((plan: PricingPlan) => (
            <div key={plan.name} className="p-10 border rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="mt-4 text-3xl font-bold">
                {plan.price.toLocaleString()}
                <span className="text-base font-normal text-gray-500">
                  /{plan.interval}
                </span>
              </p>
              <button
                onClick={handleSubscribe}
                className="mt-8 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
