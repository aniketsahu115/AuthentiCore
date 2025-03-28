import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

// Merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to a readable string
export function formatDate(date: Date | string | number | null | undefined): string {
  if (!date) return "N/A";
  
  const dateObj = new Date(date);
  return format(dateObj, "MMMM d, yyyy");
}

// Format date to a relative time
export function formatRelativeTime(date: Date | string | number | null | undefined): string {
  if (!date) return "N/A";
  
  const dateObj = new Date(date);
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

// Truncate blockchain address/hash
export function truncateAddress(address: string): string {
  if (!address) return "";
  if (address.length <= 10) return address;
  
  const start = address.substring(0, 5);
  const end = address.substring(address.length - 4);
  
  return `${start}...${end}`;
}

// Generate a random blockchain transaction ID
export function generateMockTxId(): string {
  const chars = "0123456789abcdef";
  let result = "0x";
  
  for (let i = 0; i < 16; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  
  return result;
}

// Format event name for display
export function formatEventName(event: string): string {
  return event.charAt(0).toUpperCase() + event.slice(1).replace(/([A-Z])/g, ' $1');
}

// Maps product event to icon name
export function getEventIcon(event: string): string {
  const eventMap: Record<string, string> = {
    created: "CirclePlus",
    manufactured: "Factory",
    shipped: "Truck",
    delivered: "Package",
    purchased: "ShoppingCart",
    verified: "BadgeCheck",
    default: "Circle"
  };
  
  return eventMap[event] || eventMap.default;
}
