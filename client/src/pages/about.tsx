import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LucideIcon, Globe, ShieldCheck, Lock, PaintBucket, Code, Users, Award, ExternalLink } from "lucide-react";

interface TeamMemberProps {
  name: string;
  role: string;
  imageUrl: string;
}

interface FeatureProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const teamMembers: TeamMemberProps[] = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Sophia Chen",
    role: "CTO",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Marcus Williams",
    role: "Head of Product",
    imageUrl: "https://randomuser.me/api/portraits/men/68.jpg"
  },
  {
    name: "Olivia Garcia",
    role: "Blockchain Engineer",
    imageUrl: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

const features: FeatureProps[] = [
  {
    title: "Decentralized Authentication",
    description: "Our platform leverages Solana blockchain technology to create immutable product records that cannot be tampered with.",
    icon: Globe
  },
  {
    title: "Secure Verification",
    description: "Instantly verify product authenticity with a simple scan of a QR code or by entering a product ID.",
    icon: ShieldCheck
  },
  {
    title: "End-to-End Encryption",
    description: "All sensitive data is encrypted and securely stored using industry-standard encryption protocols.",
    icon: Lock
  },
  {
    title: "Brand Protection",
    description: "Protect your brand from counterfeiting and build consumer trust with verifiable authenticity.",
    icon: PaintBucket
  },
  {
    title: "Developer API",
    description: "Integrate AuthentiCore into your existing systems with our comprehensive API and SDK.",
    icon: Code
  },
  {
    title: "Consumer Confidence",
    description: "Give customers peace of mind by allowing them to verify product authenticity before purchase.",
    icon: Users
  }
];

function TeamMember({ name, role, imageUrl }: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
    </div>
  );
}

function Feature({ title, description, icon: Icon }: FeatureProps) {
  return (
    <div className="relative">
      <dt>
        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
          <Icon className="h-6 w-6" />
        </div>
        <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">{title}</p>
      </dt>
      <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
        {description}
      </dd>
    </div>
  );
}

export default function About() {
  return (
    <div className="py-12">
      {/* Mission Section */}
      <section className="bg-white dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Our Mission</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Authentic Products in a Digital World
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
              At AuthentiCore, we're on a mission to eliminate counterfeiting and build consumer trust through blockchain-powered product authentication.
            </p>
          </div>

          <div className="mt-10">
            <p className="text-gray-500 dark:text-gray-400 max-w-3xl mx-auto text-center">
              Counterfeiting costs the global economy over $2.3 trillion annually and puts consumers at risk. We've built a decentralized platform that allows manufacturers to create tamper-proof digital passports for their products, giving consumers confidence in what they purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Platform Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Why Choose AuthentiCore
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature, index) => (
                <Feature
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-white dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Blockchain Technology</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              How AuthentiCore Works
            </p>
          </div>

          <div className="relative">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
              <div className="relative sm:py-16 lg:py-0">
                <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
                  <Card className="overflow-hidden">
                    <CardHeader className="p-6 bg-primary text-white">
                      <CardTitle>Solana Blockchain Integration</CardTitle>
                      <CardDescription className="text-primary-100">
                        Fast, secure, and eco-friendly authentication
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        AuthentiCore leverages the Solana blockchain to create immutable records of product authenticity. Each product is registered with a unique identifier and digital signature that cannot be falsified or tampered with.
                      </p>
                      <div className="mt-6 space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">High throughput (65,000+ TPS)</p>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">Low transaction costs</p>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">Carbon-neutral operation</p>
                        </div>
                      </div>
                      <div className="mt-6">
                        <a 
                          href="https://solana.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-dark inline-flex items-center text-sm"
                        >
                          Learn more about Solana
                          <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
                <div className="pt-12 sm:pt-16 lg:pt-20">
                  <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    From Manufacturer to Consumer
                  </h3>
                  <div className="mt-6 space-y-6 text-gray-500 dark:text-gray-400">
                    <p>
                      Our platform creates a secure link between manufacturers and consumers, ensuring product authenticity throughout the supply chain:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Manufacturers register their products on AuthentiCore</li>
                      <li>Product information is securely stored on the blockchain</li>
                      <li>Each product receives a unique QR code for verification</li>
                      <li>Consumers scan the QR code to instantly verify authenticity</li>
                      <li>The complete product history is transparent and immutable</li>
                    </ol>
                    <p>
                      This end-to-end solution provides peace of mind for both manufacturers and consumers, combating counterfeiting and building trust in the marketplace.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Our Team</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              The People Behind AuthentiCore
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
              Our team of experts is dedicated to building a more trustworthy marketplace for authentic products.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                imageUrl={member.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                Contact Us
              </h2>
              <div className="mt-3">
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  Have questions about AuthentiCore? We're here to help.
                </p>
              </div>
              <div className="mt-9">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-base text-gray-500 dark:text-gray-400">
                    <p>contact@authenticore.com</p>
                  </div>
                </div>
                <div className="mt-6 flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-base text-gray-500 dark:text-gray-400">
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 md:mt-0">
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                For Businesses
              </h2>
              <div className="mt-3">
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  Learn how AuthentiCore can help protect your brand and products.
                </p>
              </div>
              <div className="mt-9">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
                  >
                    Request a Demo
                  </a>
                </div>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    Our team will get back to you within 24 hours to schedule a personalized demo of the AuthentiCore platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Our Partners</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Trusted by Industry Leaders
            </p>
          </div>
          <div className="mt-8 flex justify-center space-x-8">
            <div className="h-16 w-32 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Partner 1</span>
            </div>
            <div className="h-16 w-32 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Partner 2</span>
            </div>
            <div className="h-16 w-32 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Partner 3</span>
            </div>
            <div className="h-16 w-32 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Partner 4</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to protect your products?</span>
            <span className="block">Start with AuthentiCore today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-primary-100">
            Join the growing network of manufacturers and brands using blockchain technology to combat counterfeiting.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50"
              >
                Register Your Products
              </a>
            </div>
            <div className="ml-3 inline-flex">
              <a
                href="/verify"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-dark hover:bg-primary-darker"
              >
                Verify a Product
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
