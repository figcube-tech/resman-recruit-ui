import Link from 'next/link';
import { notFound } from 'next/navigation';
import { jobs } from '@/data/jobs';

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = jobs.find((j) => j.id === parseInt(id));

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/jobs"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          ← Back to Jobs
        </Link>

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                  {job.title}
                </h1>
                <p className="text-xl text-zinc-700 dark:text-zinc-300">
                  {job.company}
                </p>
              </div>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {job.type}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-zinc-600 dark:text-zinc-400">
                <span className="mr-2 text-xl">📍</span>
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-zinc-600 dark:text-zinc-400">
                <span className="mr-2 text-xl">💰</span>
                <span>{job.salary}</span>
              </div>
            </div>

            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              Posted on {new Date(job.postedDate).toLocaleDateString()}
            </p>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                Job Description
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {job.description}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                Requirements
              </h2>
              <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                Responsibilities
              </h2>
              <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                {job.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                Benefits
              </h2>
              <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </section>

            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6">
              <Link
                href={`/jobs/${job.id}/apply`}
                className="inline-block w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors"
              >
                Apply for this Position
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return jobs.map((job) => ({
    id: job.id.toString(),
  }));
}
