"use client";

import React from "react";
import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/core/Popover";

interface NoChartsDataProps {
  /**
   * The message to display when no data is available
   * @default "No data available"
   */
  message?: string;
  
  /**
   * Optional content to display in the info popover
   * If provided, an info icon will be shown next to the message
   */
  popoverContent?: React.ReactNode;
  
  /**
   * Additional CSS classes to apply to the container
   */
  className?: string;
  
  /**
   * Custom icon to display instead of the default info icon
   */
  icon?: React.ReactNode;
  
  /**
   * Custom icon size for the info/custom icon
   * @default "size-4"
   */
  iconSize?: string;
  
  /**
   * Whether to show the backdrop blur effect
   * @default true
   */
  showBackdrop?: boolean;
  
  /**
   * Custom positioning classes for the overlay
   * @default "absolute inset-0"
   */
  position?: string;
  
  /**
   * Custom content to render instead of the default message layout
   * When provided, message and popoverContent props are ignored
   */
  children?: React.ReactNode;
}

/**
 * A reusable component for displaying no-data states in charts
 * 
 * Features:
 * - Consistent styling across all chart components
 * - Optional info popover for additional context
 * - Backdrop blur for better visual separation
 * - Accessibility support with screen readers
 * - Customizable message and styling
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <NoChartsData message="No sales data available" />
 * 
 * // With popover information
 * <NoChartsData 
 *   message="No recent activity" 
 *   popoverContent="Data will appear here once you have activity in the last 30 days"
 * />
 * 
 * // Custom styling
 * <NoChartsData 
 *   message="Chart unavailable" 
 *   className="bg-red-50 border-red-200"
 * />
 * 
 * // Custom content
 * <NoChartsData>
 *   <div className="text-center">
 *     <CustomIcon className="w-8 h-8 mx-auto mb-2" />
 *     <p>Custom no-data layout</p>
 *   </div>
 * </NoChartsData>
 * ```
 */
export function NoChartsData({
  message = "No data available",
  popoverContent,
  className = "",
  icon,
  iconSize = "size-4",
  showBackdrop = true,
  position = "absolute inset-0",
  children,
}: NoChartsDataProps) {
  // If custom children are provided, render them directly
  if (children) {
    return (
      <div className={`${position} flex items-center justify-center`}>
        <div 
          className={`
            relative z-10 card-padding rounded-lg 
            ${showBackdrop ? 'backdrop-blur-sm bg-card/50 border border-border/50' : 'bg-card border border-border'}
            ${className}
          `}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`${position} flex items-center justify-center`}>
      <div 
        className={`
          relative card-padding rounded-lg 
          ${showBackdrop ? 'backdrop-blur-sm bg-card/50 border border-border/50' : 'bg-card border border-border'}
          ${className}
        `}
        style={{
          // Use a minimal z-index that's just above the chart content
          // but stays within the chart container's stacking context
          zIndex: 1
        }}
      >
        <div className="flex items-center gap-3 text-center">
          <p className="label-base text-foreground">
            {message}
          </p>
          
          {(popoverContent || icon) && (
            <div className="flex-shrink-0">
              {popoverContent ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <button 
                      className="p-1 rounded-full hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      aria-label="Show additional information"
                    >
                      {icon || <Info className={`${iconSize} text-foreground-muted hover:text-foreground transition-colors`} />}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent 
                    className="w-80"
                    style={{
                      // Ensure popover appears above the no-data overlay
                      // but uses a reasonable z-index for modal-like content
                      zIndex: 50
                    }}
                  >
                    {popoverContent}
                  </PopoverContent>
                </Popover>
              ) : (
                // Just show the icon without popover functionality
                <div className="p-1">
                  {icon}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Screen reader announcement component for chart accessibility
 * Use this alongside NoChartsData for complete accessibility support
 */
export function NoChartsDataAnnouncement({ 
  message = "No data available",
  chartType = "chart"
}: {
  message?: string;
  chartType?: string;
}) {
  return (
    <div className="sr-only" aria-live="polite">
      {`Chart showing no data available: ${message}`}
    </div>
  );
}

/**
 * Higher-order component to wrap charts with conditional no-data rendering
 * 
 * @example
 * ```tsx
 * const ChartWithNoData = withNoData(MyChart, {
 *   message: "No sales data",
 *   popoverContent: "Data will load when available"
 * });
 * 
 * <ChartWithNoData 
 *   data={data} 
 *   hasNoData={!data?.length}
 *   // ...other chart props
 * />
 * ```
 */
export function withNoData<T extends Record<string, any>>(
  WrappedComponent: React.ComponentType<T>,
  noDataProps?: Omit<NoChartsDataProps, 'children'>
) {
  return function ChartWithNoData(props: T & { hasNoData?: boolean }) {
    const { hasNoData, ...chartProps } = props;
    
    if (hasNoData) {
      return (
        <div className="relative w-full h-full">
          <NoChartsData {...noDataProps} />
          <NoChartsDataAnnouncement 
            message={noDataProps?.message}
            chartType="chart"
          />
        </div>
      );
    }
    
    return <WrappedComponent {...(chartProps as T)} />;
  };
}