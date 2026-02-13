import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-zinc-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white hover:text-zinc-300 transition-colors">
              Resman Recruitment
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link 
              href="/" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/jobs" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors"
            >
              Jobs
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
