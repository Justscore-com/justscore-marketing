import React from "react";
import { Badge } from "@/components/ui/core/Badge";
import { Button } from "@/components/ui/core/Button";
import { PartyPopper } from "lucide-react";

interface ImageBackgroundBannerProps {
  badgeText?: string;
  title?: string;
  description?: string;
  primaryCta?: string;
  secondaryCta?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  imagePath?: string;
}

const ImageBackgroundBanner: React.FC<ImageBackgroundBannerProps> = ({
  badgeText = "Limited Time",
  title = "50% Off All Premium Plans",
  description = "Upgrade now and save with our biggest discount of the year. Offer ends soon.",
  primaryCta = "Upgrade Now",
  secondaryCta = "View Plans",
  onPrimaryClick = () => {},
  onSecondaryClick = () => {},
  imagePath = "",
}) => {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-md relative min-h-[200px] sm:min-h-[225px] lg:min-h-[265px]">
      {/* Background image container - shows complete image */}
      {imagePath && (
        <div className="hidden sm:block absolute inset-0 z-0">
          <div className="absolute right-4 top-4 bottom-4 w-1/2 lg:w-2/5">
            <img
              src={imagePath}
              alt="Banner background"
              className="w-full h-full object-contain object-right"
            />
          </div>
        </div>
      )}

      {/* Gradient overlay - covers the entire banner */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-white via-white/90 to-white/60 sm:to-transparent" />
      </div>

      {/* Content - positioned above everything */}
      <div className="relative z-20 p-6 md:p-8 lg:p-10 h-full flex items-center">
        <div className="max-w-2xl lg:max-w-3xl space-y-4">
          <Badge variant="primary-light">
            <PartyPopper className="size-4 mr-2" />
            {badgeText}
          </Badge>
          <div className="space-y-2 pb-2">
            <h2 className="display-1">{title}</h2>
            <p className="text-foreground text-base md:text-lg max-w-xl">
              {description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg" onClick={onPrimaryClick}>
              {primaryCta}
            </Button>
            <Button variant="outline" size="lg" onClick={onSecondaryClick}>
              {secondaryCta}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageBackgroundBanner;