import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Shield, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { generateQRCodeUrl } from "@/lib/qr-code";
import { truncateAddress, formatDate } from "@/lib/utils";
import ProductHistory from "@/components/product/product-history";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export default function ProductDetails() {
  const [, params] = useRoute("/product/:productId");
  const productId = params?.productId;
  
  const { data: verification, isLoading, isError } = useQuery({
    queryKey: [`/api/verify/${productId}`],
    enabled: !!productId,
  });
  
  if (isLoading) {
    return (
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <Skeleton className="h-6 w-1/3 mb-4" />
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex justify-between items-center">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/3" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 flex justify-center">
                  <Skeleton className="h-40 w-40" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-6">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Failed to load product information. Please try again.
                </AlertDescription>
              </Alert>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  // No verification data found
  if (!verification || !verification.isAuthentic || !verification.product) {
    return (
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">Product Not Verified</CardTitle>
              <CardDescription>
                This product could not be verified on the blockchain.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <AlertTitle className="text-red-800 dark:text-red-200">Verification Failed</AlertTitle>
                <AlertDescription className="text-red-700 dark:text-red-300">
                  {verification?.message || "This product could not be verified. It might be counterfeit or not registered in our system."}
                </AlertDescription>
              </Alert>
              <div className="mt-8 flex justify-center">
                <Button onClick={() => window.history.back()}>
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  // Product is verified
  const { product, history } = verification;
  
  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{product.productName}</CardTitle>
                <CardDescription>Manufactured by {product.manufacturerName}</CardDescription>
              </div>
              <Badge className="bg-green-500 hover:bg-green-600 flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Authentic
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Product Details</h3>
                <dl className="divide-y divide-gray-200 dark:divide-gray-700 border-t border-b border-gray-200 dark:border-gray-700">
                  <div className="py-3 flex justify-between text-sm">
                    <dt className="text-gray-500 dark:text-gray-400">Product ID</dt>
                    <dd className="text-gray-900 dark:text-white font-medium">{product.productId}</dd>
                  </div>
                  <div className="py-3 flex justify-between text-sm">
                    <dt className="text-gray-500 dark:text-gray-400">Manufacturer</dt>
                    <dd className="text-gray-900 dark:text-white font-medium">{product.manufacturerName}</dd>
                  </div>
                  <div className="py-3 flex justify-between text-sm">
                    <dt className="text-gray-500 dark:text-gray-400">Serial Number</dt>
                    <dd className="text-gray-900 dark:text-white font-medium">{product.serialNumber || "N/A"}</dd>
                  </div>
                  <div className="py-3 flex justify-between text-sm">
                    <dt className="text-gray-500 dark:text-gray-400">Category</dt>
                    <dd className="text-gray-900 dark:text-white font-medium">{product.category || "N/A"}</dd>
                  </div>
                  <div className="py-3 flex justify-between text-sm">
                    <dt className="text-gray-500 dark:text-gray-400">Manufacturing Date</dt>
                    <dd className="text-gray-900 dark:text-white font-medium">
                      {product.manufacturingDate ? formatDate(product.manufacturingDate) : "N/A"}
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between text-sm">
                    <dt className="text-gray-500 dark:text-gray-400">Blockchain Verification</dt>
                    <dd className="flex items-center">
                      <a 
                        href={`https://explorer.solana.com/tx/${product.blockchainTxId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-primary dark:text-primary-400 font-mono text-xs hover:underline"
                      >
                        {truncateAddress(product.blockchainTxId)}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between text-sm">
                    <dt className="text-gray-500 dark:text-gray-400">Registration Date</dt>
                    <dd className="text-gray-900 dark:text-white font-medium">
                      {formatDate(product.createdAt)}
                    </dd>
                  </div>
                </dl>
                
                {product.description && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Description</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{product.description}</p>
                  </div>
                )}
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Product QR Code</h3>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <img 
                    src={generateQRCodeUrl(`${window.location.origin}/product/${product.productId}`)} 
                    alt="Product QR Code" 
                    className="w-40 h-40"
                  />
                  <p className="mt-2 text-xs font-mono text-center text-gray-500 dark:text-gray-400">
                    {product.productId}
                  </p>
                </div>
                <div className="mt-6 flex flex-col items-center">
                  <Alert className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 mb-4">
                    <Shield className="h-5 w-5 text-green-500" />
                    <AlertTitle className="text-green-800 dark:text-green-200 ml-2">Verified on Blockchain</AlertTitle>
                    <AlertDescription className="text-green-700 dark:text-green-300 ml-2">
                      This product has been verified as authentic on the Solana blockchain.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
            
            {history && history.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Product History</h3>
                <ProductHistory history={history} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
