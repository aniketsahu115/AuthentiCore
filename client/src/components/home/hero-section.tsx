import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 py-8 sm:py-16 md:py-20 lg:max-w-2xl lg:w-full lg:py-28 xl:py-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">Authentic Products,</span>
                <span className="block text-primary">Verified on Blockchain</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                AuthentiCore enables manufacturers to create tamper-proof digital passports for their products, allowing consumers to verify authenticity instantly through blockchain verification.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link 
                    href="/verify-product"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark md:py-4 md:text-lg md:px-10"
                  >
                    Verify Product
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link 
                    href="/register"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary-100 hover:bg-primary-200 dark:bg-primary-900 dark:text-white dark:hover:bg-primary-800 md:py-4 md:text-lg md:px-10"
                  >
                    Register Product
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full bg-gradient-to-r from-primary to-blue-500 sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90 flex items-center justify-center">
          <div className="p-8 max-w-sm">
            <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="text-center mb-5">
                <div className="flex justify-center mb-2">
                  <div className="w-20 h-20 rounded-xl bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary dark:text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Premium Headphones</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Verified Authentic</p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-center">
                  <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    {/* QR Code */}
                    <div className="w-24 h-24 bg-white dark:bg-gray-900 grid grid-cols-5 grid-rows-5 gap-1">
                      <div className="col-span-2 row-span-2 bg-black dark:bg-white rounded-sm"></div>
                      <div className="col-span-1 row-span-2 bg-black dark:bg-white rounded-sm"></div>
                      <div className="col-span-2 row-span-2 bg-black dark:bg-white rounded-sm"></div>
                      <div className="col-span-1 row-span-1 bg-black dark:bg-white rounded-sm"></div>
                      <div className="col-span-3 row-span-1 bg-black dark:bg-white rounded-sm"></div>
                      <div className="col-span-1 row-span-2 bg-black dark:bg-white rounded-sm"></div>
                      <div className="col-span-2 row-span-2 bg-black dark:bg-white rounded-sm"></div>
                      <div className="col-span-2 row-span-1 bg-black dark:bg-white rounded-sm"></div>
                      <div className="col-span-2 row-span-1 bg-black dark:bg-white rounded-sm"></div>
                      <div className="col-span-2 row-span-2 bg-black dark:bg-white rounded-sm"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-xs font-mono text-center text-gray-500 dark:text-gray-400">
                  ID: AC15682-H7829B
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
