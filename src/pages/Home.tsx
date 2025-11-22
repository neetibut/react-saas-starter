import { Code, Users, Briefcase, MessageSquare } from "lucide-react";
import { ComponentType } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

type Feature = {
  name: string;
  description: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" }>;
};

const features: Feature[] = [
  {
    name: "Instant Authentication",
    description:
      "Pre-wired Clerk integration with sign-in, social logins, and user management so auth is solved out of the box.",
    icon: Users,
  },
  {
    name: "Subscriptions & Billing",
    description:
      "Integrated payment flow and subscription checks (Omise + server-side validation) so you can monetize quickly.",
    icon: Briefcase,
  },
  {
    name: "Serverless APIs",
    description:
      "Vercel serverless functions and MongoDB patterns for secure, scalable backend endpoints without complex ops.",
    icon: Code,
  },
  {
    name: "Deploy-ready",
    description:
      "Vercel config, environment handling, and deploy presets included — go from repo to production in minutes.",
    icon: MessageSquare,
  },
];

export default function Home() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="brand-font text-4xl font-bold tracking-tight text-primary sm:text-6xl">
              Launch Faster. Learn Smarter. Build Real Products.
            </h1>
            <p className="mt-6 text-lg leading-8 text-secondary">
              A modern React boilerplate built for developers who want to ship
              faster, cleaner, and business-ready apps — from Day 1.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={async () => {
                  if (!isSignedIn) {
                    navigate("/sign-in");
                    return;
                  }
                  window.open(
                    "https://github.com/neetibut/react-saas-starter",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
                className="rounded-md btn-primary px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
                aria-label="Get the boilerplate on GitHub (requires sign in)"
              >
                Get it on GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24 sm:pb-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 link-accent">
            Ship production SaaS
          </h2>
          <p className="brand-font mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            All the building blocks for a subscription product
          </p>
          <p className="mt-6 text-lg leading-8 text-secondary">
            Fastaf provides a battle-tested foundation (auth, payments,
            subscriptions, and serverless endpoints) so your team can focus on
            product differentiation.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-primary">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-secondary">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
