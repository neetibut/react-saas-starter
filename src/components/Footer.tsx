import { JSX } from "react";
import { Link } from "react-router-dom";

export default function Footer(): JSX.Element {
  return (
    <footer className="app-footer border-t mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-bold text-primary flex items-center gap-2"
            >
              <img src="/vite.svg" alt="Fastaf Logo" className="h-4 w-4" />
              <span className="brand-font text-xl font-semibold text-primary">
                Fastaf
              </span>
            </Link>
          </div>
          <p className="brand-font text-center text-xs leading-5 text-secondary">
            Launch Faster. Learn Smarter. Build Real Products. &copy;{" "}
            {new Date().getFullYear()} - All rights reserved.
          </p>
          <p className="brand-font text-xs leading-5 text-secondary">
            Built with Iced Coffee 🧋 in Hua Hin 🏝️ by{" "}
            <a
              href="https://www.linkedin.com/in/neetibut/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Neeti(นิติ)
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
