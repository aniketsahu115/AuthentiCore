/**
 * Utility functions for handling QR codes
 */

/**
 * Generate a URL for product verification
 */
export function generateVerificationUrl(productId: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}/product/${productId}`;
}

/**
 * Generate a QR code data URL
 * This is a simple function that returns a URL to generate a QR code.
 * In a real app, you would generate this on the server side or use a library like qrcode.react
 */
export function generateQRCodeUrl(data: string, size: number = 200): string {
  const encodedData = encodeURIComponent(data);
  return `https://api.qrserver.com/v1/create-qr-code/?data=${encodedData}&size=${size}x${size}`;
}

/**
 * Parse QR code data from a scan result
 */
export function parseQRCodeData(data: string): string | null {
  // In a real application, this would validate the QR code data format
  // For this example, we just check if it contains a product ID
  const parts = data.split('/');
  const productId = parts[parts.length - 1];
  
  if (productId && productId.length > 0) {
    return productId;
  }
  
  return null;
}

/**
 * Extract product ID from QR code URL
 */
export function extractProductIdFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/');
    const productId = pathSegments[pathSegments.length - 1];
    
    if (productId && productId.startsWith('AC')) {
      return productId;
    }
    
    return null;
  } catch (error) {
    return null;
  }
}
