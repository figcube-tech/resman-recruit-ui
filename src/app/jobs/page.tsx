import Link from 'next/link';
import { jobs } from '@/data/jobs';

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
            Available Positions
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Browse our current job openings and find your perfect match
          </p>
        </div>

        <div className="grid gap-6">
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="block bg-white dark:bg-zinc-800 rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">
                    {job.title}
                  </h2>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300">
                    {job.company}
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {job.type}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-zinc-600 dark:text-zinc-400">
                  <span className="mr-2">📍</span>
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-zinc-600 dark:text-zinc-400">
                  <span className="mr-2">💰</span>
                  <span>{job.salary}</span>
                </div>
              </div>

              <p className="text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4">
                {job.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500 dark:text-zinc-500">
                  Posted on {new Date(job.postedDate).toLocaleDateString()}
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
