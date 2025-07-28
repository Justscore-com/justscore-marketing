/**
 * File Path: components/ui/composite/StatsCard/index.tsx
 * 
 * Enhanced StatsCard component with built-in skeleton loading state.
 * Maintains backward compatibility with existing imports.
 */
"use client";

import React, { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/core/Card";
import { Skeleton } from "@/components/ui/core/Skeleton";
import { TrendingUp, TrendingDown, MoveRight, LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/core/Badge";
import { HeroBadge } from "@/components/ui/core/HeroBadge";

export interface StatItemProps {
  title: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  trendLabel?: string;
  icon?: LucideIcon;
}

export interface StatsCardProps {
  items?: StatItemProps[];
  className?: string;
  columns?: 2 | 3 | 4 | 5 | 6;
  withDividers?: boolean;
  background?: "default" | "muted";
  // Enhanced loading state props
  isLoading?: boolean;
  skeletonCount?: number;
}

// Optimized skeleton component
const StatItemSkeleton = React.memo(() => (
  <div className="flex flex-col">
    <div className="flex items-center justify-between -mt-0.5">
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-6 w-6 rounded-full" />
    </div>
    <div className="mt-0">
      <Skeleton className="h-8 w-16 mb-2" />
    </div>
    <div className="flex items-center gap-1.5 mt-1">
      <Skeleton className="h-5 w-16 rounded-full" />
      <Skeleton className="h-3 w-12" />
    </div>
  </div>
));
StatItemSkeleton.displayName = "StatItemSkeleton";

// Optimized StatItem component
export const StatItem = React.memo<StatItemProps>(({
  title,
  value,
  trend,
  trendValue,
  trendLabel,
  icon,
}) => {
  const isNA = value === "N/A";

  const getTrendIcon = React.useCallback(() => {
    switch (trend) {
      case "up":
        return <TrendingUp className="size-4" />;
      case "down":
        return <TrendingDown className="size-4" />;
      case "neutral":
        return <MoveRight className="size-4" />;
      default:
        return null;
    }
  }, [trend]);

  const getTrendVariant = React.useCallback(() => {
    switch (trend) {
      case "up":
        return "success-light";
      case "down":
        return "warning-light";
      case "neutral":
        return "info-light";
      default:
        return "outline";
    }
  }, [trend]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between -mt-0.5">
        <h3 className={`label-base text-foreground ${isNA ? "opacity-50" : ""} truncate`}>
          {title}
        </h3>
        {icon && (
          <div className="hidden sm:flex ml-2 flex-shrink-0 -mr-1 -mt-1">
            <HeroBadge icon={icon} size="sm" variant="neutral" />
          </div>
        )}
      </div>
      <div className="mt-0">
        <span className={`heading-1 text-foreground-strong ${isNA ? "opacity-50" : ""} break-words`}>
          {value}
        </span>
      </div>
      {!isNA && (trendLabel || trend) && (
        <div className="flex flex-wrap items-center gap-1.5 mt-1 text-sm">
          {trend && (
            <Badge
              variant={getTrendVariant() as any}
              className="flex items-center gap-1.5 text-xs"
            >
              {getTrendIcon()}
              {trendValue && <span className="truncate max-w-32">{trendValue}</span>}
            </Badge>
          )}
          {trendLabel && trend && (
            <span className="text-xs truncate text-foreground-weak">{trendLabel}</span>
          )}
          {!trend && trendLabel && (
            <span className="text-xs text-foreground-weak truncate">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
});
StatItem.displayName = "StatItem";

// Main StatsCard component with enhanced loading
export function StatsCard({
  items = [],
  className = "",
  columns = 4,
  withDividers = true,
  background = "default",
  isLoading = false,
  skeletonCount,
}: StatsCardProps) {
  const getGridCols = React.useCallback(() => {
    switch (columns) {
      case 2:
        return "grid grid-cols-2 sm:grid-cols-2";
      case 3:
        return "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3";
      case 4:
        return "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4";
      case 5:
        return "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5";
      case 6:
        return "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6";
      default:
        return "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4";
    }
  }, [columns]);
  
  const getDividerClasses = React.useCallback(() => {
    return withDividers 
      ? "divide-y divide-x d md:divide-x-1 divide-neutral-100"
      : "gap-4";
  }, [withDividers]);

  const getCardClass = React.useCallback(() => {
    return background === "muted" ? "bg-muted/30" : "";
  }, [background]);

  // Render content based on loading state
  const renderContent = React.useMemo(() => {
    if (isLoading) {
      const count = skeletonCount || columns;
      return Array.from({ length: count }, (_, index) => (
        <div
          key={`skeleton-${index}`}
          className={
            withDividers
              ? `p-6 py-5 ${
                  index % columns === 0 ? "sm:pr-4" : 
                  (index + 1) % columns === 0 || index === count - 1 ? "sm:pl-4" : 
                  "sm:px-4"
                }`
              : "p-4 bg-background rounded-md shadow-sm"
          }
        >
          <StatItemSkeleton />
        </div>
      ));
    }

    return items.map((item, index) => (
      <div
        key={`stat-item-${index}`}
        className={
          withDividers
            ? `p-6 py-5 ${
                index % columns === 0 ? "sm:pr-4" : 
                (index + 1) % columns === 0 || index === items.length - 1 ? "sm:pl-4" : 
                "sm:px-4"
              }`
            : "p-4 bg-background rounded-md shadow-sm"
        }
      >
        <StatItem {...item} />
      </div>
    ));
  }, [isLoading, items, columns, withDividers, skeletonCount]);

  return (
    <Card className={getCardClass()}>
      <CardContent className={withDividers ? "p-0" : "py-4"}>
        <div className={`${getGridCols()} ${getDividerClasses()} ${className}`}>
          {renderContent}
        </div>
      </CardContent>
    </Card>
  );
}