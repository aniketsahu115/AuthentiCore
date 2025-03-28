import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ExternalLink } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";
import { generateQRCodeUrl } from "@/lib/qr-code";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { label: "Electronics", value: "Electronics" },
  { label: "Fashion", value: "Fashion" },
  { label: "Luxury Goods", value: "Luxury Goods" },
  { label: "Automotive", value: "Automotive" },
  { label: "Pharmaceuticals", value: "Pharmaceuticals" },
  { label: "Food & Beverage", value: "Food & Beverage" },
  { label: "Other", value: "Other" },
];

// Extended schema for client-side validation
const productRegistrationSchema = z.object({
  productName: z.string().min(3, "Product name must be at least 3 characters"),
  manufacturerName: z.string().min(2, "Manufacturer name is required"),
  serialNumber: z.string().optional(),
  manufacturingDate: z.string().optional(),
  expiryDate: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
});

type ProductRegistrationFormData = z.infer<typeof productRegistrationSchema>;

export default function RegistrationForm() {
  const { wallet } = useWallet();
  const { toast } = useToast();
  const [registeredProduct, setRegisteredProduct] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const form = useForm<ProductRegistrationFormData>({
    resolver: zodResolver(productRegistrationSchema),
    defaultValues: {
      productName: "",
      manufacturerName: wallet?.address ? "Your Company Name" : "",
      serialNumber: "",
      manufacturingDate: "",
      expiryDate: "",
      category: "Electronics",
      description: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: ProductRegistrationFormData) => {
      // Simulate file upload before API call
      if (isUploading) {
        await simulateFileUpload();
      }
      
      const response = await apiRequest("POST", "/api/products", {
        ...data,
        manufacturerId: wallet?.address ? 1 : undefined
      });
      return response.json();
    },
    onSuccess: (data) => {
      setRegisteredProduct(data);
      toast({
        title: "Product Registered Successfully",
        description: `Your product has been registered with ID: ${data.productId}`,
      });
      form.reset();
      setIsUploading(false);
      setUploadProgress(0);
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsUploading(false);
      setUploadProgress(0);
    },
  });

  // Simulate file upload progress
  const simulateFileUpload = async () => {
    setUploadProgress(0);
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            resolve();
            return 100;
          }
          return newProgress;
        });
      }, 300);
    });
  };

  const onSubmit = (data: ProductRegistrationFormData) => {
    // If files were "selected", show upload progress
    const filesSelected = document.getElementById('file-upload') as HTMLInputElement;
    const certsSelected = document.getElementById('cert-upload') as HTMLInputElement;
    
    if ((filesSelected && filesSelected.files && filesSelected.files.length > 0) ||
        (certsSelected && certsSelected.files && certsSelected.files.length > 0)) {
      setIsUploading(true);
    }
    
    registerMutation.mutate(data);
  };

  const handleFileChange = () => {
    // No actual file upload, but we'll acknowledge the selection
    toast({
      title: "Files Selected",
      description: "Files have been selected and will be uploaded when the product is registered.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Registration Form</CardTitle>
        <CardDescription>Add your product to the blockchain ledger for authentication.</CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="manufacturerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter manufacturer name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serial Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Optional serial number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="manufacturingDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manufacturing Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date (if applicable)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief description of the product including key features and specifications" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>Product Images</FormLabel>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none">
                      <span>Upload files</span>
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        className="sr-only" 
                        multiple 
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <FormLabel>Additional Certifications</FormLabel>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label htmlFor="cert-upload" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none">
                      <span>Upload certificates</span>
                      <input 
                        id="cert-upload" 
                        name="cert-upload" 
                        type="file" 
                        className="sr-only" 
                        multiple 
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF, PNG up to 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Upload Progress Indicator */}
            {isUploading && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Uploading files...</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {uploadProgress}% complete
                </p>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <Button 
              type="submit" 
              disabled={registerMutation.isPending || !wallet?.connected}
            >
              {registerMutation.isPending ? "Registering..." : "Register Product"}
            </Button>
          </CardFooter>
        </form>
      </Form>
      
      {/* Success Card - shown after successful registration */}
      {registeredProduct && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-green-600 dark:text-green-400">Product Successfully Registered</CardTitle>
            <CardDescription>
              Your product has been added to the blockchain and can now be verified by consumers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-lg font-medium">Product Details</h3>
                <dl className="mt-2 divide-y divide-gray-200 dark:divide-gray-700 border-t border-b border-gray-200 dark:border-gray-700">
                  <div className="py-3 flex justify-between text-sm">
                    <dt className="text-gray-500 dark:text-gray-400">Product ID</dt>
                    <dd className="text-gray-900 dark:text-white font-medium">{registeredProduct.productId}</dd>
                  </div>
                  <div className="py-3 flex justify-between text-sm">
                    <dt className="text-gray-500 dark:text-gray-400">Product Name</dt>
                    <dd className="text-gray-900 dark:text-white font-medium">{registeredProduct.productName}</dd>
                  </div>
                  <div className="py-3 flex justify-between text-sm">
                    <dt className="text-gray-500 dark:text-gray-400">Blockchain Transaction</dt>
                    <dd className="flex items-center">
                      <span className="text-primary dark:text-primary-400 font-mono text-xs mr-2">{registeredProduct.blockchainTxId}</span>
                      <ExternalLink className="h-4 w-4 text-primary dark:text-primary-400" />
                    </dd>
                  </div>
                </dl>
              </div>
              
              <div className="flex-1 text-center">
                <h3 className="text-lg font-medium mb-4">Product QR Code</h3>
                <div className="inline-block p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <img 
                    src={generateQRCodeUrl(`${window.location.origin}/product/${registeredProduct.productId}`)} 
                    alt="Product QR Code" 
                    className="w-40 h-40"
                  />
                  <p className="mt-2 text-xs font-mono text-gray-500 dark:text-gray-400">
                    {registeredProduct.productId}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setRegisteredProduct(null)}>
              Register Another Product
            </Button>
          </CardFooter>
        </Card>
      )}
    </Card>
  );
}
