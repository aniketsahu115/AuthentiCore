import { Link } from "wouter";
import Brand from "@/components/ui/brand";

export default function Footer() {
  return (
    <footer className="bg-gray-700 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Brand 
              logoSize={52} 
              fontSize="lg" 
              animated={false} 
              textColor="white" 
              variant="filled" 
            />
            <p className="mt-2 text-base text-gray-400">
              Decentralized Product Authentication Platform
            </p>
            <div className="mt-4 flex space-x-6">
              <a href="https://x.com/_Authenticore" className="text-gray-400 hover:text-gray-300" target="_blank">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://github.com/aniketsahu115/AuthentiCore" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://discord.com" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Discord</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M18.942 5.556a16.299 16.299 0 00-4.126-1.297c-.178.321-.385.754-.529 1.097a15.175 15.175 0 00-4.573 0 11.583 11.583 0 00-.535-1.097 16.274 16.274 0 00-4.129 1.3c-2.611 3.946-3.319 7.794-2.965 11.587a16.494 16.494 0 005.061 2.593 12.65 12.65 0 001.084-1.785 10.689 10.689 0 01-1.707-.831c.143-.106.283-.217.418-.331 3.291 1.539 6.866 1.539 10.118 0 .137.114.277.225.418.331-.541.326-1.114.606-1.71.832a12.52 12.52 0 001.084 1.785 16.46 16.46 0 005.064-2.595c.415-4.396-.709-8.209-2.973-11.589zM8.678 14.813c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c-.017 1.123-.793 2.045-1.798 2.045zm6.644 0c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c-.017 1.123-.793 2.045-1.798 2.045z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Platform</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link 
                    href="/#how-it-works"
                    className="text-base text-gray-400 hover:text-gray-300"
                  >
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/verify"
                    className="text-base text-gray-400 hover:text-gray-300"
                  >
                    Verify Product
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/register"
                    className="text-base text-gray-400 hover:text-gray-300"
                  >
                    Register Product
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/register"
                    className="text-base text-gray-400 hover:text-gray-300"
                  >
                    For Manufacturers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link 
                    href="/documentation"
                    className="text-base text-gray-400 hover:text-gray-300"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/documentation?tab=guides"
                    className="text-base text-gray-400 hover:text-gray-300"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/documentation?tab=api"
                    className="text-base text-gray-400 hover:text-gray-300"
                  >
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/support"
                    className="text-base text-gray-400 hover:text-gray-300"
                  >
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Stay Updated</h3>
            <p className="mt-4 text-base text-gray-400">
              Get the latest updates about product features and announcements.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full bg-primary border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-primary-dark"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              Cookie Policy
            </a>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2025 AuthentiCore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
