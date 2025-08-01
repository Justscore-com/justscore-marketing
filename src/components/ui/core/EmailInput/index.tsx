import * as React from "react";
import { Input } from "@/components/ui/core/Input";
import { Switch } from "@/components/ui/core/Switch";
import { Label } from "@/components/ui/core/Label";
import { cn } from "@/lib/utils";

export interface EmailInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  defaultDomain: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  inputSize?: "sm" | "base" | "lg" | "xl";
}

const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  (
    {
      id,
      name,
      value = "",
      defaultDomain,
      onChange,
      placeholder = "Enter username",
      className = "",
      error,
      inputSize = "base",
      ...props
    },
    ref
  ) => {
    const [useCustomEmail, setUseCustomEmail] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [customEmail, setCustomEmail] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Use the provided ref or create our own
    const combinedRef = useCombinedRef(ref, inputRef);

    // Helper to check if email uses default domain
    const isDefaultDomainEmail = (email: string): boolean => {
      if (!email || !email.includes("@")) return true;
      const domainPart = email.split("@")[1];
      return domainPart.toLowerCase() === defaultDomain.toLowerCase();
    };

    // Helper to extract username from email
    const extractUsername = (email: string): string => {
      if (!email || !email.includes("@")) return email || "";
      return email.split("@")[0];
    };

    // Initialize component state from props
    React.useEffect(() => {
      const emailValue = value || "";

      // Clear internal state when value becomes empty
      if (!emailValue) {
        setUsername("");
        setCustomEmail("");
        setUseCustomEmail(false);
        return;
      }

      if (typeof emailValue === "string") {
        if (emailValue.includes("@")) {
          const isDefaultDomain = isDefaultDomainEmail(emailValue);
          setUseCustomEmail(!isDefaultDomain);

          if (!isDefaultDomain) {
            // It's a custom email - store in customEmail state
            setCustomEmail(emailValue);
          } else {
            // Extract username from default domain email
            setUsername(extractUsername(emailValue));
          }
        } else {
          // No @ symbol, treat as username
          setUsername(emailValue);
          setUseCustomEmail(false);
        }
      }
    }, [value, defaultDomain]);

    // Handle switch toggle
    const handleToggleCustomEmail = React.useCallback(
      (checked: boolean) => {
        // Immediately update state
        setUseCustomEmail(checked);

        // Use setTimeout to ensure state updates before focusing
        setTimeout(() => {
          // Focus the input after state changes
          if (combinedRef.current) {
            combinedRef.current.focus();
          }
        }, 0);

        if (checked) {
          // Switching to custom email mode
          // Don't prefill the domain - just start with username or empty string
          const newCustomEmail = username || "";
          setCustomEmail(newCustomEmail);

          const customEvent = {
            target: {
              name,
              value: newCustomEmail,
            },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(customEvent);
        } else {
          // Switching to default domain mode
          // Extract username from current value if it exists
          const currentValue = value || "";
          const extractedUsername = extractUsername(
            typeof currentValue === "string" ? currentValue : ""
          );
          setUsername(extractedUsername);

          const newEvent = {
            target: {
              name,
              value: extractedUsername
                ? `${extractedUsername}@${defaultDomain}`
                : "",
            },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(newEvent);
        }
      },
      [username, value, name, defaultDomain, onChange, combinedRef]
    );

    // Handle user input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (useCustomEmail) {
        // Store custom email value
        setCustomEmail(newValue);
        // Pass through the full email value
        onChange(e);
      } else {
        // In default mode, strip out "@" characters if entered
        // This prevents unexpected behavior while keeping cursor position
        const sanitizedValue = newValue.replace(/@/g, "");
        setUsername(sanitizedValue);

        // Only update if the value actually changed (to avoid unnecessary events)
        if (sanitizedValue !== username) {
          const customEvent = {
            target: {
              name: e.target.name,
              value: `${sanitizedValue}@${defaultDomain}`,
            },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(customEvent);
        }
      }
    };

    return (
      <div className="space-y-3">
        <div className="relative">
          {!useCustomEmail ? (
            <div className="relative">
              <Input
                id={id}
                name={name}
                value={username}
                onChange={handleInputChange}
                placeholder={placeholder}
                inputSize={inputSize}
                className={cn(
                  "pr-[calc(1rem+var(--domain-width))]",
                  error && "border-destructive focus-visible:ring-destructive",
                  className
                )}
                aria-invalid={!!error}
                ref={combinedRef}
                {...props}
                style={
                  {
                    "--domain-width": `${defaultDomain.length * 0.6 + 1}rem`,
                  } as React.CSSProperties
                }
              />
              <span className="absolute right-3 text-foreground-weak pointer-events-none top-1/2 -translate-y-1/2">
                @{defaultDomain}
              </span>
            </div>
          ) : (
            <Input
              id={id}
              name={name}
              type="email"
              value={customEmail}
              onChange={handleInputChange}
              placeholder="Enter full email address"
              className={cn(
                error && "border-destructive focus-visible:ring-destructive",
                className
              )}
              aria-invalid={!!error}
              ref={combinedRef}
              inputSize={inputSize}
              {...props}
            />
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id={`${id}-toggle-custom`}
            checked={useCustomEmail}
            onCheckedChange={handleToggleCustomEmail}
            size="default"
            aria-label={
              useCustomEmail ? "Use default domain" : "Use custom email"
            }
          />
          <Label
            htmlFor={`${id}-toggle-custom`}
            className="text-xs text-foreground-muted cursor-pointer"
          >
            {useCustomEmail
              ? "Using custom email"
              : `Using ${defaultDomain} domain`}
          </Label>
        </div>
      </div>
    );
  }
);

// Helper function to combine refs
function useCombinedRef<T>(
  forwardedRef: React.ForwardedRef<T>,
  localRef: React.RefObject<T>
) {
  return React.useMemo(() => {
    if (!forwardedRef) return localRef;

    return {
      get current() {
        return localRef.current;
      },
      set current(value) {
        if (typeof forwardedRef === "function") {
          forwardedRef(value);
        } else {
          forwardedRef.current = value;
        }
        // localRef.current = value;
      },
    };
  }, [forwardedRef, localRef]);
}

EmailInput.displayName = "EmailInput";

export { EmailInput };