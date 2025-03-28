import { PlusCircle, Database, ShieldCheck } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">How It Works</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Product Authentication Made Simple
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            Our blockchain-powered solution ensures products are authentic from creation to customer.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <PlusCircle className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Product Registration</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                Manufacturers register products with detailed information, creating a unique digital passport on the blockchain.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <Database className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Blockchain Storage</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                All product data is securely stored on the Solana blockchain, creating an immutable and transparent record.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Instant Verification</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                Consumers can scan product QR codes to instantly verify authenticity and view the complete product history.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
