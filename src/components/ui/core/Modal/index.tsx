"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { Button } from "../Button";

interface ModalContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleId?: string;
  descriptionId?: string;
  setTitleId?: (id: string) => void;
  setDescriptionId?: (id: string) => void;
}

const ModalContext = React.createContext<ModalContextValue | null>(null);

const useModalContext = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within a Modal");
  }
  return context;
};

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const Modal = ({ open, onOpenChange, children }: ModalProps) => {
  const [titleId, setTitleId] = React.useState<string>();
  const [descriptionId, setDescriptionId] = React.useState<string>();

  // Keyboard and body scroll management
  React.useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onOpenChange]);

  const contextValue = React.useMemo<ModalContextValue>(
    () => ({
      open,
      onOpenChange,
      titleId,
      descriptionId,
      setTitleId,
      setDescriptionId,
    }),
    [open, onOpenChange, titleId, descriptionId]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ children, className, ...props }, ref) => {
    const { open, onOpenChange, titleId, descriptionId } = useModalContext();
    const [isMounted, setIsMounted] = React.useState(false);

    // Handle client-side rendering
    React.useEffect(() => {
      setIsMounted(true);
    }, []);

    const handleOverlayClick = React.useCallback(
      (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
          onOpenChange(false);
        }
      },
      [onOpenChange]
    );

    if (!isMounted || !open) return null;

    return createPortal(
      <div
        role="dialog"
        aria-modal={true}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleOverlayClick}
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in-0"
          aria-hidden="true"
        />

        {/* Modal Card */}
        <div
          ref={ref}
          className={cn(
            "relative bg-white shadow z-50 w-full max-w-2xl max-h-[90vh]",
            "rounded-xl overflow-hidden",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            className
          )}
          {...props}
        >
          {/* Close button */}
          <Button
            onClick={() => onOpenChange(false)}
            variant="ghost"
            icon
            aria-label="Close"
            className="absolute right-2 top-2 z-30"
          >
            <X />
          </Button>

          {/* Scrollable content area */}
          <div className="overflow-y-auto max-h-[90vh] p-8">
            {children}
          </div>
        </div>
      </div>,
      document.body
    );
  }
);
ModalContent.displayName = "ModalContent";

const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)}
    {...props}
  />
));
ModalHeader.displayName = "ModalHeader";

const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const enhancedChildren = React.useMemo(
    () =>
      React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Button) {
          return React.cloneElement(child, {
            ...child.props,
            size: child.props.size || "default",
          });
        }
        return child;
      }),
    [children]
  );

  return (
    <div 
      ref={ref} 
      className={cn("flex gap-4 justify-end mt-8", className)} 
      {...props}
    >
      {enhancedChildren}
    </div>
  );
});
ModalFooter.displayName = "ModalFooter";

const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { setTitleId } = useModalContext();
  const id = React.useId();

  React.useEffect(() => {
    setTitleId?.(id);
    return () => setTitleId?.("");
  }, [id, setTitleId]);

  return (
    <h2 
      ref={ref} 
      id={id} 
      className={cn("heading-2", className)} 
      {...props} 
    />
  );
});
ModalTitle.displayName = "ModalTitle";

const ModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { setDescriptionId } = useModalContext();
  const id = React.useId();

  React.useEffect(() => {
    setDescriptionId?.(id);
    return () => setDescriptionId?.("");
  }, [id, setDescriptionId]);

  return (
    <p 
      ref={ref} 
      id={id} 
      className={cn("caption text-foreground-weak", className)} 
      {...props} 
    />
  );
});
ModalDescription.displayName = "ModalDescription";

export {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
};