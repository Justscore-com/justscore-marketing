"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/core/Table";
import { Avatar, AvatarFallback } from "@/components/ui/core/Avatar";
import { ChevronRight } from "lucide-react";
import StarRating from "@/components/ui/core/StarRating";
import { cn } from "@/lib/utils";
import { PerformanceBadge } from "@/components/ui/core/PerformanceBadge";
import { TrendBadge, type TrendVariant } from "@/components/ui/core/TrendBadge";
import { 
  useTeamPerformanceQuery, 
  useAllTeams, 
  useTeamDataSelectors,
  useTeamDataStore 
} from "@/store/members-table-store";

type MembersTableDOMProps = React.HTMLAttributes<HTMLDivElement>;

export interface MembersTableWithStoreProps extends MembersTableDOMProps {
  teamId?: string; // Optional - if provided, shows only team members
  showAvatar?: boolean;
  showActions?: boolean;
  showTableHead?: boolean;
  onNavigate?: (path: string) => void;
}

// Helper function to truncate name for mobile view
function getDisplayName(fullName: string, isMobile: boolean): string {
  if (!isMobile) return fullName;
  
  const nameParts = fullName.trim().split(' ');
  if (nameParts.length <= 1) return fullName;
  
  const firstName = nameParts[0];
  const lastNameInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  
  return `${firstName} ${lastNameInitial}.`;
}

function MembersTableWithStore({
  className,
  teamId,
  showAvatar = true,
  showActions = true,
  showTableHead = true,
  onNavigate,
  ...props
}: MembersTableWithStoreProps) {
  const { data: teamData, isLoading: teamLoading, error: teamError } = useTeamPerformanceQuery(teamId || '');
  const { data: teamsData, isLoading: teamsLoading, error: teamsError } = useAllTeams();
  
  // Use data directly from queries instead of round-trip through store
  const membersToDisplay = React.useMemo(() => {
    if (!teamData?.members || !Array.isArray(teamData.members)) {
      return [];
    }
    
    const members = teamData.members;
    
    // Filter for assigned members only (safety check, backend should already filter)
    const assignedMembers = members.filter(member => member.isAssigned);
    
    // Sort members by rating
    const sortedMembers = [...assignedMembers].sort((a, b) => {
      if (a.ratingsCount === 0 && b.ratingsCount === 0) return 0;
      if (a.ratingsCount === 0) return 1;
      if (b.ratingsCount === 0) return -1;
      return b.averageRating - a.averageRating;
    });
    
    // Filter by team if teamId is provided
    if (teamId) {
      const filtered = sortedMembers.filter(member => member.teamId === teamId);
      return filtered;
    }
    
    return sortedMembers;
  }, [teamData, teamId]);

  // Loading state
  if (teamLoading || teamsLoading) {
    return (
      <div className={cn("w-full", className)} {...props}>
        <div className="flex items-center justify-center py-8">
          <div className="text-foreground-muted">Loading members...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (teamError || teamsError) {
    return (
      <div className={cn("w-full", className)} {...props}>
        <div className="flex items-center justify-center py-8">
          <div className="text-destructive">
            Error loading data: {teamError?.message || teamsError?.message}
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (membersToDisplay.length === 0 && !teamLoading && !teamsLoading) {
    return (
      <div className={cn("w-full", className)} {...props}>
        <div className="flex items-center justify-center py-8">
          <div className="text-foreground-muted">No members found.</div>
        </div>
      </div>
    );
  }

  const teamsMap = teamsData?.reduce((acc, team) => {
    acc[team.id] = team;
    return acc;
  }, {} as Record<string, typeof teamsData[0]>) || {};

  const showTeamColumn = Object.keys(teamsMap).length > 1;

  return (
    <div className={cn("w-full", className)} {...props}>
      <Table data-slot="table">
        {showTableHead && (
          <TableHeader data-slot="table-header">
            <TableRow data-slot="table-row">
              {showAvatar && (
                <TableHead data-slot="table-head" className="w-10 px-0" />
              )}
              <TableHead data-slot="table-head" className="pl-2">
                Name
              </TableHead>
              {showTeamColumn && (
                <TableHead data-slot="table-head">Team</TableHead>
              )}
              <TableHead data-slot="table-head">Quarterly Trend</TableHead>
              <TableHead data-slot="table-head">Performance</TableHead>
              <TableHead data-slot="table-head" className="w-[200px]">
                Scores
              </TableHead>
              {showActions && (
                <TableHead data-slot="table-head" className="w-10" />
              )}
            </TableRow>
          </TableHeader>
        )}
        <TableBody data-slot="table-body">
          {membersToDisplay.map((member) => {
            const effectiveTeamId = teamId || member.teamId;
            const detailsPath = `/dashboard/teams/${encodeURIComponent(
              effectiveTeamId
            )}/members/${encodeURIComponent(member.id)}`;
            const teamName = teamsMap[member.teamId]?.name;
            const teamNameDisplay = teamName || (
              <span className="text-unavailable">No team</span>
            );

            const handleRowClick = () => {
              if (onNavigate) {
                onNavigate(detailsPath);
              }
            };

            return (
              <TableRow 
                data-slot="table-row" 
                key={member.id}
                onClick={handleRowClick}
                className="cursor-pointer hover:bg-neutral-50"
                tabIndex={0}
                role="button"
                aria-label={`View details for ${member.name}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleRowClick();
                  }
                }}
              >
                {showAvatar && (
                  <TableCell
                    data-slot="table-cell"
                    className="px-2 align-middle"
                  >
                    <Avatar data-slot="avatar" className="size-8">
                      <AvatarFallback data-slot="avatar-fallback">
                        {member.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                )}
                <TableCell
                  data-slot="table-cell"
                  className={cn(
                    "pl-2 align-middle whitespace-nowrap",
                    showTeamColumn ? "w-[30%]" : "w-[40%]"
                  )}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground-strong leading-4">
                      <span className="lg:hidden">
                        {getDisplayName(member.name, true)}
                      </span>
                      <span className="hidden lg:inline">
                        {member.name}
                      </span>
                    </span>
                    {member.title && (
                      <span className="text-xs text-foreground-muted leading-3 mt-0.5">
                        {member.title}
                      </span>
                    )}
                    {!member.title && (
                      <span className="text-xs text-unavailable leading-3 mt-0.5">
                        No title
                      </span>
                    )}
                  </div>
                </TableCell>
                {showTeamColumn && (
                  <TableCell
                    data-slot="table-cell"
                    className="w-[15%] align-middle leading-4"
                  >
                    {teamNameDisplay}
                  </TableCell>
                )}
                <TableCell
                  data-slot="table-cell"
                  className="w-[15%] align-middle"
                >
                  <TrendBadge
                    variant={member.trend as TrendVariant || "stable"}
                    size="sm"
                    noTrendData={!member.trend}
                  />
                </TableCell>
                <TableCell
                  data-slot="table-cell"
                  className="w-[15%] align-middle"
                >
                  <PerformanceBadge
                    value={member.averageRating}
                    ratingsCount={member.ratingsCount}
                    size="base"
                  />
                </TableCell>
                <TableCell
                  data-slot="table-cell"
                  className="w-[180px] whitespace-nowrap align-middle"
                >
                  <StarRating
                    value={member.averageRating}
                    disabled
                    size="sm"
                    ratingsCount={member.ratingsCount}
                    className="w-[150px]"
                  />
                </TableCell>
                {showActions && (
                  <TableCell
                    data-slot="table-cell"
                    className="w-0 pr-2 align-middle"
                  >
                    <ChevronRight className="size-4 text-foreground-muted" />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export { MembersTableWithStore }; 