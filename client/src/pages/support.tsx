import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MessageSquare, Phone, FileQuestion, HelpCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function Support() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission delay
    setTimeout(() => {
      toast({
        title: "Support request submitted",
        description: "We'll get back to you as soon as possible.",
      });
      setEmail("");
      setSubject("");
      setMessage("");
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Customer Support
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
          We're here to help! Choose from the options below to get the support you need.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="contact">
            <TabsList className="mb-8">
              <TabsTrigger value="contact" className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                <span>Contact Us</span>
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center">
                <FileQuestion className="w-4 h-4 mr-2" />
                <span>FAQs</span>
              </TabsTrigger>
              <TabsTrigger value="help" className="flex items-center">
                <HelpCircle className="w-4 h-4 mr-2" />
                <span>Help Center</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>
                    Fill out the form below to get in touch with our support team.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        placeholder="Brief description of your issue"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Please provide as much detail as possible..."
                        rows={6}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button type="submit" disabled={submitting} className="w-full">
                      {submitting ? "Submitting..." : "Submit Support Request"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Find answers to common questions about AuthentiCore.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">What is AuthentiCore?</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        AuthentiCore is a decentralized product authentication platform that leverages blockchain technology
                        to verify the authenticity of products. It helps manufacturers protect their brands from counterfeiting
                        and gives consumers confidence in their purchases.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">How does product verification work?</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Each authentic product is registered on the Solana blockchain with a unique identifier.
                        Consumers can scan the product's QR code or enter the product ID on our platform to verify
                        its authenticity and view its complete history.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Do I need a crypto wallet to use AuthentiCore?</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Consumers don't need a wallet to verify products. Manufacturers and brands need a Solana wallet
                        (like Phantom or Solflare) to register products and manage their account.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">How secure is the platform?</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        AuthentiCore uses blockchain technology to create immutable records that can't be altered or forged.
                        All data is secured using advanced cryptographic techniques, and manufacturers undergo a verification
                        process before they can register products.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Can I integrate AuthentiCore with my existing systems?</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Yes, we provide APIs and SDKs that allow you to integrate AuthentiCore with your existing
                        inventory management, e-commerce, and supply chain systems. Our documentation provides
                        detailed instructions for implementation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="help">
              <Card>
                <CardHeader>
                  <CardTitle>Help Center</CardTitle>
                  <CardDescription>
                    Explore our knowledge base and tutorials.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="#" className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <h3 className="text-lg font-medium">Getting Started Guide</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Learn the basics of using AuthentiCore for product verification.
                      </p>
                    </a>
                    
                    <a href="#" className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <h3 className="text-lg font-medium">Manufacturer Tutorials</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Step-by-step guides for product registration and management.
                      </p>
                    </a>
                    
                    <a href="#" className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <h3 className="text-lg font-medium">API Documentation</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Technical reference for developers integrating with our platform.
                      </p>
                    </a>
                    
                    <a href="#" className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <h3 className="text-lg font-medium">Wallet Connection Help</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Troubleshooting tips for connecting Solana wallets.
                      </p>
                    </a>
                    
                    <a href="#" className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <h3 className="text-lg font-medium">QR Code Scanning</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Help with scanning and interpreting product QR codes.
                      </p>
                    </a>
                    
                    <a href="#" className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <h3 className="text-lg font-medium">Video Tutorials</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Watch visual walkthroughs of our platform's features.
                      </p>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Other ways to reach our support team.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-primary" />
                <div>
                  <h3 className="text-sm font-medium">Email Support</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <a href="mailto:support@authenticore.io" className="text-primary hover:underline">
                      support@authenticore.io
                    </a>
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                    Response time: 24-48 hours
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-primary" />
                <div>
                  <h3 className="text-sm font-medium">Phone Support</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <a href="tel:+1-555-123-4567" className="text-primary hover:underline">
                      +1 (555) 123-4567
                    </a>
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                    Monday-Friday, 9am-5pm EST
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MessageSquare className="w-5 h-5 mr-3 text-primary" />
                <div>
                  <h3 className="text-sm font-medium">Live Chat</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Available on our website during business hours.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Start Chat
                  </Button>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
                <h3 className="text-sm font-medium mb-2">Business Hours</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Monday-Friday: 9:00 AM - 5:00 PM EST<br />
                  Saturday-Sunday: Closed
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}