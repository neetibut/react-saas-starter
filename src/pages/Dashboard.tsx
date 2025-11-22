import { useUser } from "@clerk/clerk-react";

type User = {
  firstName?: string;
};

export default function Dashboard() {
  const { user } = useUser() as { user: User | null };

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-primary">
        Welcome back, {user?.firstName || "Student"}!
      </h1>
      <p className="mt-4 text-secondary">Here are your active courses.</p>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Course placeholders */}
        <div className="card-surface border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border-muted">
          <div className="h-32 bg-neutral-800 rounded-md mb-4 flex items-center justify-center text-secondary">
            Course Image
          </div>
          <h3 className="font-semibold text-lg text-primary">
            React Fundamentals
          </h3>
          <p className="text-sm text-secondary mt-2">Progress: 45%</p>
          <div className="w-full bg-neutral-700 rounded-full h-2.5 mt-4">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: "45%" }}
            ></div>
          </div>
          <button className="mt-4 w-full rounded-md btn-primary px-3 py-2 text-sm font-semibold shadow-sm">
            Continue Learning
          </button>
        </div>

        <div className="card-surface border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border-muted">
          <div className="h-32 bg-neutral-800 rounded-md mb-4 flex items-center justify-center text-secondary">
            Course Image
          </div>
          <h3 className="font-semibold text-lg text-primary">
            Advanced Node.js
          </h3>
          <p className="text-sm text-secondary mt-2">Progress: 10%</p>
          <div className="w-full bg-neutral-700 rounded-full h-2.5 mt-4">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: "10%" }}
            ></div>
          </div>
          <button className="mt-4 w-full rounded-md btn-primary px-3 py-2 text-sm font-semibold shadow-sm">
            Start Course
          </button>
        </div>
      </div>
    </div>
  );
}
