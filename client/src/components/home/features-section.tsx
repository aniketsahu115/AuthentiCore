import { ShieldCheck, QrCode, History, BarChart } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            A Complete Authentication Solution
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            AuthentiCore provides a robust set of tools to combat counterfeiting and ensure product authenticity.
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <ShieldCheck className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Blockchain Verified</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Every product is assigned a unique digital identity on the Solana blockchain, making verification secure and immutable.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <QrCode className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">QR Code Integration</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Each product gets a unique QR code that consumers can scan to instantly verify authenticity.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <History className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Product History</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Track the complete lifecycle of a product from manufacturing to retail, ensuring full transparency.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <BarChart className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Analytics Dashboard</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Manufacturers gain access to a comprehensive dashboard to monitor verifications and track product usage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
