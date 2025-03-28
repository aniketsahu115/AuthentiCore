import { Lock, Shield, Database, Eye } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Security & Trust</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Built on Secure Blockchain Technology
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            AuthentiCore's platform is designed with security and transparency as core principles.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-primary text-white">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="ml-4 text-xl font-medium text-gray-900 dark:text-white">Cryptographic Security</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Products are secured using industry-standard cryptographic signatures and state-of-the-art blockchain technology to prevent counterfeiting.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-primary text-white">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="ml-4 text-xl font-medium text-gray-900 dark:text-white">Manufacturer Verification</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              All manufacturers undergo a rigorous verification process to ensure only legitimate businesses can register products on our platform.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-primary text-white">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="ml-4 text-xl font-medium text-gray-900 dark:text-white">Immutable Records</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Every product registration and verification is permanently recorded on the blockchain, creating an unchangeable audit trail that protects both consumers and brands.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-primary text-white">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="ml-4 text-xl font-medium text-gray-900 dark:text-white">Complete Transparency</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              The entire product history is visible to consumers, providing unprecedented transparency about the authenticity and journey of their purchases.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-primary/5 dark:bg-primary/10 rounded-lg p-6 border border-primary/20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Our Commitment to Security</h3>
              <p className="text-gray-600 dark:text-gray-400">
                AuthentiCore adheres to the highest security standards, with regular security audits and continuous improvement of our technology. Our decentralized approach means there's no single point of failure, ensuring your product authentication data remains secure and accessible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}