import VerificationForm from "@/components/product/verification-form";

export default function VerifyProduct() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Product Verification</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Verify Authenticity Instantly
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            Enter a product ID or scan a QR code to check if your product is authentic.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <VerificationForm />
        </div>
      </div>
    </section>
  );
}
