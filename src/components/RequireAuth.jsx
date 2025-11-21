import { useAuth, useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children, requireSubscription = true }) {
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const { user } = useUser();
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [checkingSubscription, setCheckingSubscription] = useState(true);

  useEffect(() => {
    if (!requireSubscription) {
      setCheckingSubscription(false);
      return;
    }

    async function checkSubscription() {
      if (isSignedIn && user) {
        try {
          const token = await getToken();
          // Add timestamp to prevent caching
          const response = await fetch(`/api/subscription?t=${Date.now()}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          // console.log("Subscription check result:", data);
          setIsSubscribed(data.isSubscribed);
        } catch (error) {
          console.error("Failed to check subscription:", error);
          setIsSubscribed(false);
        } finally {
          setCheckingSubscription(false);
        }
      } else if (!isSignedIn && isLoaded) {
        setCheckingSubscription(false);
      }
    }

    checkSubscription();
  }, [isSignedIn, user, isLoaded, requireSubscription]);

  if (!isLoaded || checkingSubscription) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  if (requireSubscription && !isSubscribed) {
    return <Navigate to="/pricing?reason=premium_required" replace />;
  }

  return children;
}
