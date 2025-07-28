import React from "react";
import Image from "next/image";

// IllustrationTabs component props
interface IllustrationTabsProps {
  /** SVG content as string path */
  svg: string;
  /** Text to display below the illustrationTabs */
  text: string;
  /** Whether the illustrationTabs is in active state */
  isActive?: boolean;
  /** Optional CSS class for additional styling */
  className?: string;
}

export const IllustrationTabs: React.FC<IllustrationTabsProps> = ({
  svg,
  text,
  isActive = false,
  className = "",
}) => {
  return (
    <div
      className={`
      flex flex-col items-center gap-4 pb-4  
      group
      ${className}
    `}
    >
      {/* IllustrationTabs Container */}
      <div className="relative">
        <div
          className={`
          w-32 sm:w-24 lg:w-48 aspect-[4/3]
          cursor-pointer !focus:outline-none !focus:ring-0 !active:outline-none !active:ring-0 !select-none 
          flex items-center justify-center overflow-hidden
          relative rounded-lg
        `}
        >
          {/* Image with consistent sizing */}
          <div className="relative w-full h-full p-4">
            <Image
              src={svg}
              alt={text}
              fill
              className="object-contain z-10"
              sizes="(max-width: 640px) 128px, (max-width: 1024px) 96px, 192px"
            />
          </div>

          {/* Overlay with hover and active state color */}
          <div
            className={`
              absolute inset-0 z-20
              group-hover:bg-primary-800 group-hover:mix-blend-color mix-blend-color
              transition-colors duration-200
              ${isActive ? "bg-primary-800" : "bg-neutral-900"}
            `}
          />
        </div>
      </div>

      {/* Text */}
      <span
        className={`
          text-xs
          font-medium
          tracking-tight
          text-center 
          transition-colors 
          duration-200
          group-hover:text-primary-600
          ${isActive ? "text-primary-600" : "text-neutral-600"}
        `}
      >
        {text}
      </span>
    </div>
  );
};