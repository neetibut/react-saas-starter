import { Code, Users, Briefcase, MessageSquare } from "lucide-react";
import { ComponentType } from "react";

type Feature = {
  name: string;
  description: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" }>;
};

const features: Feature[] = [
  {
    name: "Expert Instructors",
    description:
      "Learn from industry veterans who have built scalable systems at top tech companies.",
    icon: Users,
  },
  {
    name: "Hands-on Projects",
    description:
      "Build real-world applications that you can add to your portfolio and show to recruiters.",
    icon: Code,
  },
  {
    name: "Career Support",
    description:
      "Get resume reviews, mock interviews, and direct referrals to our hiring partners.",
    icon: Briefcase,
  },
  {
    name: "Community Access",
    description:
      "Join a vibrant community of learners and mentors to get help when you need it.",
    icon: MessageSquare,
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Master Software Development
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join our intensive bootcamp and launch your career in tech. Learn
              React, Node.js, and modern best practices.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/pricing"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24 sm:pb-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Learn faster
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to become a pro
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our curriculum is designed to take you from zero to hero in 12
            weeks.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
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
