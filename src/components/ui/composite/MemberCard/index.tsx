"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/core/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/core/Card";
import { Avatar, AvatarFallback } from "@/components/ui/core/Avatar";
import { ChevronRight } from "lucide-react";
import StarRating from "@/components/ui/core/StarRating";
import { cn } from "@/lib/utils";
import { PerformanceBadge } from "@/components/ui/core/PerformanceBadge";
import { TrendBadge, type TrendVariant } from "@/components/ui/core/TrendBadge";

export interface Team {
  id: string;
  name: string;
}

export interface Member {
  id: string;
  name: string;
  title: string | null;
  averageRating: number;
  ratingsCount: number;
  teamId: string;
  teamName: string;
}

export interface MemberCardProps extends React.HTMLAttributes<HTMLDivElement> {
  member?: Member;
  teamId?: string;
  teams?: Team[];
  variant?: "mobile" | "desktop";
  onNavigate?: (path: string) => void;
  onGenerateReview?: (member: Member) => void;
  handleViewDetails?: () => void;
  onDelete?: (member: Member) => void;
}

function MemberCard({
  className,
  member,
  teamId,
  teams,
  variant = "mobile",
  onNavigate,
  onGenerateReview,
  handleViewDetails,
  onDelete,
  ...props
}: MemberCardProps) {
  const router = useRouter();

  // Check if member is defined
  if (!member) {
    return <div>No member data available</div>; // Handle the case where member is undefined
  }

  // Calculate effective team ID and encoded IDs
  const effectiveTeamId = teamId ?? member.teamId;
  const encodedTeamId = encodeURIComponent(effectiveTeamId);
  const encodedMemberId = encodeURIComponent(member.id);
  const detailPath = `/dashboard/teams/${encodedTeamId}/members/${encodedMemberId}`;

  const handleCardClick = () => {
    const path = detailPath;
    if (onNavigate) {
      onNavigate(path);
    } else {
      router.push(path);
    }
  };

  return (
    <Card
      data-slot="card"
      className={cn(
        "flex flex-col cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-primary/5 border-border/50 hover:border-border active:scale-[0.98] relative",
        variant === "desktop" ? "relative" : "md:relative",
        className
      )}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${member.name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      {...props}
    >
      <CardHeader
        data-slot="card-header"
        className={cn(
          "space-y-4",
          variant === "desktop"
            ? "flex flex-col items-center pt-6"
            : "pr-12 md:pr-6 md:flex md:flex-col md:items-center md:pt-6"
        )}
      >
        {/* Mobile chevron indicator - positioned absolutely, centered to entire card */}
        <div className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2",
          variant === "desktop" ? "hidden" : "block md:hidden"
        )}>
          <ChevronRight className="size-5 text-foreground-muted" />
        </div>

        <div
          className={cn(
            "flex w-full",
            variant === "desktop"
              ? "flex-col items-center text-center"
              : "items-start justify-between md:flex-col md:items-center md:text-center"
          )}
        >
          <div
            className={cn(
              "flex",
              variant === "desktop"
                ? "flex-col items-center gap-2"
                : "gap-4 md:flex-col md:items-center md:gap-2"
            )}
          >
            <Avatar
              data-slot="avatar"
              className={cn(
                variant === "desktop" ? "size-14" : "size-12 md:size-14"
              )}
            >
              <AvatarFallback
                data-slot="avatar-fallback"
                className={cn(
                  "font-semibold",
                  variant === "desktop" ? "text-base" : "text-sm md:text-base"
                )}
              >
                {member.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "flex-1",
                variant === "desktop" ? "text-center" : "md:text-center"
              )}
            >
              <h3 className={cn(
                "heading-3 leading-tight",
                variant === "desktop" ? "" : "md:pr-0"
              )}>
                {member.name}
              </h3>
              <p className={cn(
                "text-sm text-foreground-weak mt-1",
                variant === "desktop" ? "" : "md:pr-0"
              )}>
                {member.title || "No title"}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent data-slot="card-content" className={cn(
        "flex-1 pt-4 pb-4 lg:pb-6",
        variant === "desktop" ? "" : "pr-12 md:pr-6"
      )}>
        {/* Star rating on left, performance badge on right - all breakpoints */}
        <div className="flex flex-wrap md:justify-center items-center md:mx-auto gap-2">
          {/* Star Rating - Left side */}
          <div className="flex items-center gap-2">
            <StarRating
              value={member.averageRating}
              disabled
              size="sm"
              ratingsCount={member.ratingsCount}
            />
          </div>

          {/* Performance Badge - Right side */}
          <PerformanceBadge
            value={member.averageRating}
            ratingsCount={member.ratingsCount}
            size="base"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export { MemberCard };