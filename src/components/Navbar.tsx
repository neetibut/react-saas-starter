import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { JSX } from "react";

export default function Navbar(): JSX.Element {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              DevBootcamp
            </Link>
          </div>
          <div className="hidden sm:flex sm:space-x-8">
            <Link
              to="/"
              className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
            >
              Pricing
            </Link>
            <Link
              to="/premium"
              className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
            >
              Premium
            </Link>
            <SignedIn>
              <Link
                to="/dashboard"
                className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
              >
                Dashboard
              </Link>
            </SignedIn>
          </div>
          <div className="flex items-center">
            <SignedOut>
              <Link
                to="/sign-in"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
