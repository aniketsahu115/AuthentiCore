import { formatDate } from "@/lib/utils";
import { ProductHistory as ProductHistoryType } from "@/types";
import { PlusCircle, Truck, ShoppingCart } from "lucide-react";

interface ProductHistoryProps {
  history: ProductHistoryType[];
}

export default function ProductHistory({ history }: ProductHistoryProps) {
  // Sort history by timestamp in descending order (newest first)
  const sortedHistory = [...history].sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
  
  // Function to get icon component based on event type
  const getEventIcon = (event: string) => {
    switch (event) {
      case "created":
      case "manufactured":
        return <PlusCircle className="h-5 w-5 text-white" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-white" />;
      case "purchased":
        return <ShoppingCart className="h-5 w-5 text-white" />;
      default:
        return <PlusCircle className="h-5 w-5 text-white" />;
    }
  };
  
  // Function to get background color based on event type
  const getEventColor = (event: string) => {
    switch (event) {
      case "created":
      case "manufactured":
        return "bg-primary";
      case "shipped":
        return "bg-blue-500";
      case "purchased":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };
  
  // Function to capitalize the event name for display
  const formatEventName = (event: string) => {
    return event.charAt(0).toUpperCase() + event.slice(1);
  };
  
  return (
    <div className="mt-2 flow-root">
      <ul className="-mb-8">
        {sortedHistory.map((item, index) => (
          <li key={item.id}>
            <div className="relative pb-8">
              {index < sortedHistory.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                  aria-hidden="true"
                ></span>
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className={`h-8 w-8 rounded-full ${getEventColor(item.event)} flex items-center justify-center ring-8 ring-white dark:ring-gray-900`}>
                    {getEventIcon(item.event)}
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Product {formatEventName(item.event)}
                      {item.data && item.data.location && (
                        <span> at <span className="font-medium text-gray-900 dark:text-white">{item.data.location}</span></span>
                      )}
                      {item.data && item.data.destination && (
                        <span> to <span className="font-medium text-gray-900 dark:text-white">{item.data.destination}</span></span>
                      )}
                      {item.data && item.data.buyer && (
                        <span> by <span className="font-medium text-gray-900 dark:text-white">{item.data.buyer}</span></span>
                      )}
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                    <time dateTime={new Date(item.timestamp).toISOString()}>
                      {formatDate(item.timestamp)}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
