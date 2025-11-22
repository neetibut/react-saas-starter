import { useUser } from "@clerk/clerk-react";

type User = {
  firstName?: string;
};

export default function Dashboard() {
  const { user } = useUser() as { user: User | null };

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Welcome back, {user?.firstName || "Student"}!
      </h1>
      <p className="mt-4 text-gray-600">Here are your active courses.</p>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Course placeholders */}
        <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="h-32 bg-indigo-100 rounded-md mb-4 flex items-center justify-center text-indigo-500">
            Course Image
          </div>
          <h3 className="font-semibold text-lg">React Fundamentals</h3>
          <p className="text-sm text-gray-500 mt-2">Progress: 45%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: "45%" }}
            ></div>
          </div>
          <button className="mt-4 w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-indigo-300 hover:bg-indigo-50">
            Continue Learning
          </button>
        </div>

        <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="h-32 bg-green-100 rounded-md mb-4 flex items-center justify-center text-green-500">
            Course Image
          </div>
          <h3 className="font-semibold text-lg">Advanced Node.js</h3>
          <p className="text-sm text-gray-500 mt-2">Progress: 10%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: "10%" }}
            ></div>
          </div>
          <button className="mt-4 w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-green-600 shadow-sm ring-1 ring-inset ring-green-300 hover:bg-green-50">
            Start Course
          </button>
        </div>
      </div>
    </div>
  );
}
