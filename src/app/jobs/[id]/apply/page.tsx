'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { jobs } from '@/data/jobs';

export default function JobApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = parseInt(params.id as string);
  const job = jobs.find((j) => j.id === jobId);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
    linkedIn: '',
    portfolio: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!job) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              Job Not Found
            </h1>
            <Link
              href="/jobs"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Back to Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    setSubmitted(true);
    
    // In a real application, you would send this data to a backend API
    setTimeout(() => {
      router.push('/jobs');
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
              Application Submitted!
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
              Thank you for applying to {job.title} at {job.company}.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">
              We&apos;ll review your application and get back to you soon.
            </p>
            <Link
              href="/jobs"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Back to Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/jobs/${jobId}`}
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          ← Back to Job Details
        </Link>

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Apply for {job.title}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              {job.company}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                placeholder="john.doe@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Resume URL *
              </label>
              <input
                type="url"
                id="resume"
                name="resume"
                required
                value={formData.resume}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                placeholder="https://example.com/resume.pdf"
              />
            </div>

            <div>
              <label
                htmlFor="linkedIn"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                LinkedIn Profile (Optional)
              </label>
              <input
                type="url"
                id="linkedIn"
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>

            <div>
              <label
                htmlFor="portfolio"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Portfolio URL (Optional)
              </label>
              <input
                type="url"
                id="portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                placeholder="https://johndoe.com"
              />
            </div>

            <div>
              <label
                htmlFor="coverLetter"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Cover Letter *
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                required
                value={formData.coverLetter}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                placeholder="Tell us why you're a great fit for this position..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Submit Application
              </button>
              <Link
                href={`/jobs/${jobId}`}
                className="flex-1 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
