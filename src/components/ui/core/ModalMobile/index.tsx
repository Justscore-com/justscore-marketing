// src/components/ui/MobileFullscreenModal.tsx

"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface MobileFullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const MobileFullscreenModal = React.memo(function MobileFullscreenModal({
  isOpen,
  onClose,
  children,
  className,
}: MobileFullscreenModalProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  // Handle client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle viewport height and body scroll
  useEffect(() => {
    if (!isOpen) return;

    const setViewportHeight = () => {
      // Use the visual viewport height which accounts for mobile browser UI
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set initial height
    setViewportHeight();

    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalWidth = document.body.style.width;
    const originalHeight = document.body.style.height;
    
    // Prevent background scrolling - mobile safe
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.top = "0";
    document.body.style.left = "0";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleResize = () => {
      setViewportHeight();
    };

    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Handle visual viewport API if available (modern browsers)
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = originalWidth;
      document.body.style.height = originalHeight;
      document.body.style.top = "";
      document.body.style.left = "";
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
      
      document.documentElement.style.removeProperty('--vh');
    };
  }, [isOpen, onClose]);

  if (!isMounted || !isOpen) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 bg-white",
        className
      )}
      style={{ 
        height: 'calc(var(--vh, 1vh) * 100)',
        minHeight: '-webkit-fill-available',
        WebkitOverflowScrolling: 'touch',
        overflow: 'auto',
      }}
      role="dialog"
      aria-modal={true}
    >
      {children}
    </div>,
    document.body
  );
});

interface MobileModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const MobileModalHeader = React.memo(function MobileModalHeader({
  children,
  className,
}: MobileModalHeaderProps) {
  return (
    <div className={cn("shrink-0 flex-none", className)}>
      {children}
    </div>
  );
});

interface MobileModalContentProps {
  children: React.ReactNode;
  className?: string;
}

const MobileModalContent = React.memo(function MobileModalContent({
  children,
  className,
}: MobileModalContentProps) {
  return (
    <div 
      className={cn("overflow-auto", className)}
      style={{ 
        WebkitOverflowScrolling: 'touch',
        paddingBottom: '88px', // Space for footer + safe area
      }}
    >
      {children}
    </div>
  );
});

interface MobileModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

const MobileModalFooter = React.memo(function MobileModalFooter({
  children,
  className,
}: MobileModalFooterProps) {
  return (
    <div 
      className={cn("fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/80 backdrop-blur-xs", className)}
      style={{ 
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
      }}
    >
      {children}
    </div>
  );
});

export {
  MobileFullscreenModal,
  MobileModalHeader,
  MobileModalContent,
  MobileModalFooter,
};