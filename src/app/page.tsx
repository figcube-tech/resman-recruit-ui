import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connect with top companies and advance your career
            </p>
            <Link
              href="/jobs"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-zinc-900 dark:text-white">
            Why Choose Resman Recruitment?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">
                Targeted Opportunities
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                Find jobs that match your skills and career goals
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">
                Top Companies
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                Connect with industry-leading organizations
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">
                Quick Application
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                Apply to multiple positions with ease
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

