import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating?: number;
}

function Testimonial({ content, author, role, company, avatar, rating = 5 }: TestimonialProps) {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 transform transition-transform duration-300 hover:scale-105">
      <div className="flex space-x-1 mb-4">
        {Array.from({ length: rating }).map((_, index) => (
          <StarIcon key={index} className="h-5 w-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-6">"{content}"</p>
      <div className="flex items-center">
        <Avatar className="h-12 w-12 border-2 border-primary">
          <AvatarImage src={avatar} alt={author} />
          <AvatarFallback className="bg-primary text-white">
            {author.split(' ').map(name => name[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h4 className="font-medium text-gray-900 dark:text-white">{author}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}, {company}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const testimonials: TestimonialProps[] = [
    {
      content: "AuthentiCore has revolutionized our anti-counterfeiting strategy. We've seen a 40% reduction in reported counterfeits since implementing their solution.",
      author: "Sarah Chen",
      role: "Product Director",
      company: "LuxeWear Brands",
      avatar: "",
      rating: 5
    },
    {
      content: "As a consumer, I love being able to verify that my high-end purchases are authentic with just a quick scan. The product history feature gives me complete confidence.",
      author: "Marcus Johnson",
      role: "Customer",
      company: "Tech Enthusiast",
      avatar: "",
      rating: 5
    },
    {
      content: "The onboarding process was seamless, and our products were on the blockchain within days. Their team provided excellent support through the entire implementation.",
      author: "David Rodriguez",
      role: "CTO",
      company: "Premium Electronics Inc.",
      avatar: "",
      rating: 4
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Trusted by Brands and Consumers
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            See what our customers have to say about the AuthentiCore platform.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center p-4 rounded-lg bg-primary/10 dark:bg-primary/20">
            <p className="text-lg font-medium text-primary">
              Trusted by over 500+ brands worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}