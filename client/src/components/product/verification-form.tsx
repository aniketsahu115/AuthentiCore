import { useState } from "react";
import { useForm } from "react-hook-form";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { generateQRCodeUrl } from "@/lib/qr-code";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { apiRequest } from "@/lib/queryClient";
import { ProductVerification } from "@/types";
import { useMutation } from "@tanstack/react-query";
import ProductHistory from "./product-history";

interface VerificationFormData {
  productId: string;
}

export default function VerificationForm() {
  const [_, navigate] = useLocation();
  const [showCameraInput, setShowCameraInput] = useState(false);
  const [verification, setVerification] = useState<ProductVerification | null>(null);
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<VerificationFormData>();
  
  const verifyMutation = useMutation({
    mutationFn: async (productId: string) => {
      const response = await apiRequest("GET", `/api/verify/${productId}`, undefined);
      return response.json() as Promise<ProductVerification>;
    },
    onSuccess: (data) => {
      setVerification(data);
      if (data.isAuthentic && data.product) {
        // Add a small delay for good UX
        setTimeout(() => {
          navigate(`/product/${data.product?.productId}`);
        }, 1500);
      }
    },
  });
  
  const onSubmit = async (data: VerificationFormData) => {
    verifyMutation.mutate(data.productId);
  };
  
  const handleQRScan = () => {
    // In a real app, this would activate the camera and scan a QR code
    setShowCameraInput(!showCameraInput);
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Product Authentication</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Enter the product ID to verify its authenticity on the blockchain.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Button
              type="button"
              variant="outline"
              className="inline-flex items-center"
              onClick={handleQRScan}
            >
              <Camera className="h-5 w-5 mr-2" />
              Scan QR Code
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="product-id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Product ID
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <Input
                  id="product-id"
                  placeholder="Enter product ID (e.g., AC15682-H7829B)"
                  {...register("productId", { required: "Product ID is required" })}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  className="ml-3"
                  disabled={verifyMutation.isPending}
                >
                  {verifyMutation.isPending ? "Verifying..." : "Verify"}
                </Button>
              </div>
              {errors.productId && (
                <p className="text-sm text-red-500 mt-1">{errors.productId.message}</p>
              )}
            </div>
          </form>
        </div>
        
        {showCameraInput && (
          <div className="mt-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-md p-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                QR code scanning would be implemented here in a production app.
              </p>
              <div className="mt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    // Demo: When QR is scanned, prefill the input with an example product ID
                    setValue("productId", "AC15682-H7829B");
                    setShowCameraInput(false);
                  }}
                >
                  Simulate QR Scan
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Verification Result */}
        {verifyMutation.isSuccess && verification && (
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            {verification.isAuthentic ? (
              <Alert className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <AlertTitle className="text-green-800 dark:text-green-200 ml-2">Product Authenticated</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-300 ml-2">
                  This product has been verified as authentic on the blockchain.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <AlertTitle className="text-red-800 dark:text-red-200 ml-2">Verification Failed</AlertTitle>
                <AlertDescription className="text-red-700 dark:text-red-300 ml-2">
                  {verification.message || "This product could not be verified. It might be counterfeit or not registered in our system."}
                </AlertDescription>
              </Alert>
            )}
            
            {verification.isAuthentic && verification.product && (
              <>
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Product Details</h4>
                  <dl className="mt-2 divide-y divide-gray-200 dark:divide-gray-700 border-t border-b border-gray-200 dark:border-gray-700">
                    <div className="py-3 flex justify-between text-sm">
                      <dt className="text-gray-500 dark:text-gray-400">Product Name</dt>
                      <dd className="text-gray-900 dark:text-white font-medium">{verification.product.productName}</dd>
                    </div>
                    <div className="py-3 flex justify-between text-sm">
                      <dt className="text-gray-500 dark:text-gray-400">Manufacturer</dt>
                      <dd className="text-gray-900 dark:text-white font-medium">{verification.product.manufacturerName}</dd>
                    </div>
                    <div className="py-3 flex justify-between text-sm">
                      <dt className="text-gray-500 dark:text-gray-400">Manufacturing Date</dt>
                      <dd className="text-gray-900 dark:text-white font-medium">
                        {verification.product.manufacturingDate 
                          ? new Date(verification.product.manufacturingDate).toLocaleDateString() 
                          : "N/A"}
                      </dd>
                    </div>
                    <div className="py-3 flex justify-between text-sm">
                      <dt className="text-gray-500 dark:text-gray-400">Serial Number</dt>
                      <dd className="text-gray-900 dark:text-white font-medium">{verification.product.serialNumber || "N/A"}</dd>
                    </div>
                    <div className="py-3 flex justify-between text-sm">
                      <dt className="text-gray-500 dark:text-gray-400">Blockchain Verification</dt>
                      <dd className="flex items-center">
                        <span className="text-primary dark:text-primary-400 font-mono text-xs mr-2">{verification.product.blockchainTxId}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </dd>
                    </div>
                  </dl>
                </div>
                
                {verification.history && verification.history.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Product History</h4>
                    <ProductHistory history={verification.history} />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
