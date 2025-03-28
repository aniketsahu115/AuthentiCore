import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, FileText, Code, MessageSquare } from "lucide-react";

export default function Documentation() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Documentation
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
          Comprehensive guides and references to help you integrate with and use the AuthentiCore platform.
        </p>
      </div>

      <Tabs defaultValue="guides">
        <TabsList className="mb-8">
          <TabsTrigger value="guides" className="flex items-center">
            <Book className="w-4 h-4 mr-2" />
            <span>Guides</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center">
            <Code className="w-4 h-4 mr-2" />
            <span>API Reference</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            <span>Resources</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            <span>Support</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Learn the basics of using AuthentiCore</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This guide will walk you through the process of setting up your account,
                  connecting your wallet, and registering your first product.
                </p>
                <a href="#" className="block mt-4 text-primary hover:underline">
                  Read more →
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>For Manufacturers</CardTitle>
                <CardDescription>Integrate AuthentiCore with your production</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Learn how to integrate the AuthentiCore platform with your manufacturing process,
                  from product registration to QR code generation.
                </p>
                <a href="#" className="block mt-4 text-primary hover:underline">
                  Read more →
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>For Retailers</CardTitle>
                <CardDescription>Verify products in your inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Learn how to verify the authenticity of products in your inventory
                  and how to help customers verify their purchases.
                </p>
                <a href="#" className="block mt-4 text-primary hover:underline">
                  Read more →
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Lifecycle</CardTitle>
                <CardDescription>Track products from creation to consumer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Understand how AuthentiCore tracks the complete lifecycle of a product,
                  from manufacturing to retail to consumer ownership.
                </p>
                <a href="#" className="block mt-4 text-primary hover:underline">
                  Read more →
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blockchain Integration</CardTitle>
                <CardDescription>Understanding the Solana integration</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Learn about how AuthentiCore utilizes the Solana blockchain
                  to create immutable records of product authenticity.
                </p>
                <a href="#" className="block mt-4 text-primary hover:underline">
                  Read more →
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Features</CardTitle>
                <CardDescription>Explore additional capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Discover advanced features like batch registration, analytics,
                  custom branding options, and more.
                </p>
                <a href="#" className="block mt-4 text-primary hover:underline">
                  Read more →
                </a>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>Developer resources for integrating with AuthentiCore</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  AuthentiCore provides a comprehensive RESTful API that allows developers to
                  integrate product authentication into their own applications and services.
                </p>
                
                <h3>Authentication</h3>
                <p>
                  All API requests require authentication using a JWT token. To obtain a token,
                  you need to connect your wallet and sign a message.
                </p>
                
                <h3>Base URL</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-md overflow-x-auto">
                  https://api.authenticore.io/v1
                </pre>
                
                <h3>Available Endpoints</h3>
                <ul>
                  <li><code>/products</code> - Create, read, and manage products</li>
                  <li><code>/verify</code> - Verify product authenticity</li>
                  <li><code>/users</code> - Manage user accounts</li>
                  <li><code>/manufacturers</code> - Manufacturer operations</li>
                </ul>
                
                <p>
                  For detailed information about each endpoint, including request parameters,
                  response formats, and examples, please refer to our complete API reference.
                </p>
                
                <a href="#" className="mt-4 inline-flex items-center text-primary hover:underline">
                  <span>Full API Reference</span>
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Downloads</CardTitle>
                <CardDescription>Resources and tools for integration</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <FileText className="w-5 h-5 mr-2 text-primary" />
                    <div>
                      <h4 className="font-medium">SDK Documentation</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Complete documentation for the AuthentiCore SDK.
                      </p>
                      <a href="#" className="text-sm text-primary hover:underline">Download PDF</a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="w-5 h-5 mr-2 text-primary" />
                    <div>
                      <h4 className="font-medium">Integration Guide</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Step-by-step guide for integrating AuthentiCore.
                      </p>
                      <a href="#" className="text-sm text-primary hover:underline">Download PDF</a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="w-5 h-5 mr-2 text-primary" />
                    <div>
                      <h4 className="font-medium">QR Code Specifications</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Technical specifications for AuthentiCore QR codes.
                      </p>
                      <a href="#" className="text-sm text-primary hover:underline">Download PDF</a>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Development Tools</CardTitle>
                <CardDescription>Tools and libraries for developers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Code className="w-5 h-5 mr-2 text-primary" />
                    <div>
                      <h4 className="font-medium">JavaScript SDK</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Official JavaScript SDK for interacting with AuthentiCore.
                      </p>
                      <a href="#" className="text-sm text-primary hover:underline">GitHub Repository</a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Code className="w-5 h-5 mr-2 text-primary" />
                    <div>
                      <h4 className="font-medium">Python SDK</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Official Python SDK for interacting with AuthentiCore.
                      </p>
                      <a href="#" className="text-sm text-primary hover:underline">GitHub Repository</a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Code className="w-5 h-5 mr-2 text-primary" />
                    <div>
                      <h4 className="font-medium">Solana Smart Contracts</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Sample Solana smart contracts for product registration.
                      </p>
                      <a href="#" className="text-sm text-primary hover:underline">GitHub Repository</a>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get help from our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  Our support team is available to help you with any questions or issues
                  you may have with the AuthentiCore platform.
                </p>
                
                <h3>Email Support</h3>
                <p>
                  For general inquiries and support requests, please email us at:
                  <a href="mailto:support@authenticore.io" className="ml-2 text-primary hover:underline">
                    support@authenticore.io
                  </a>
                </p>
                
                <h3>Live Chat</h3>
                <p>
                  Live chat support is available Monday through Friday, 9:00 AM to 5:00 PM EST.
                </p>
                <button className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                  Start Chat
                </button>
                
                <h3>Developer Community</h3>
                <p>
                  Join our developer community to connect with other developers, share knowledge,
                  and get help with technical questions.
                </p>
                <a href="#" className="mt-2 inline-flex items-center text-primary hover:underline">
                  <span>Join Discord Community</span>
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}