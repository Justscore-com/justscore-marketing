/**
 * File Path: components/ui/composite/ViewStates/index.tsx
 * 
 * Shared view state components for consistent error, empty, and loading states.
 * Provides standardized UX patterns across all data views.
 */
"use client";

import React from "react";
import { Button } from "@/components/ui/core/Button";
import { Alert, AlertDescription } from "@/components/ui/core/Alert";
import { NoContentFound } from "@/components/ui/composite/NoContentFound";
import { AlertCircle, RotateCcw, type LucideIcon } from "lucide-react";

// Types
export interface ViewErrorProps {
  error: Error | string;
  onRetry?: () => void;
  className?: string;
}

export interface ViewEmptyProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export interface ViewLayoutProps {
  children: React.ReactNode;
  className?: string;
}

// Error State Component
export const ViewError = React.memo<ViewErrorProps>(({ 
  error, 
  onRetry, 
  className = "" 
}) => (
  <div className={`space-y-4 ${className}`}>
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        {error instanceof Error ? error.message : error}
      </AlertDescription>
    </Alert>
    {onRetry && (
      <div className="flex justify-center">
        <Button variant="outline" onClick={onRetry}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    )}
  </div>
));
ViewError.displayName = "ViewError";

// Empty State Component
export const ViewEmpty = React.memo<ViewEmptyProps>(({ 
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ""
}) => (
  <div className={className}>
    <NoContentFound
      icon={icon}
      title={title}
      description={description}
      actionLabel={actionLabel}
      onAction={onAction}
      variant="section"
      buttonProps={{
        className: "gap-2",
      }}
    />
  </div>
));
ViewEmpty.displayName = "ViewEmpty";

// Layout Container Component
export const ViewLayout = React.memo<ViewLayoutProps>(({ 
  children, 
  className = "" 
}) => (
  <div className={`space-y-6 ${className}`}>
    {children}
  </div>
));
ViewLayout.displayName = "ViewLayout";

// Section Wrapper Component
export interface ViewSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const ViewSection = React.memo<ViewSectionProps>(({ 
  id, 
  children, 
  className = "" 
}) => (
  <section aria-labelledby={id} className={className}>
    {children}
  </section>
));
ViewSection.displayName = "ViewSection";