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
  useTeamDataSelectors 
} from "@/store/members-table-store";

// Updated types to include trend information
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
  trend?: TrendVariant; // Added trend property
}

type MembersTableDOMProps = React.HTMLAttributes<HTMLDivElement>;

export interface MembersTableProps extends MembersTableDOMProps {
  members?: Member[]; // Made optional to support Zustand usage
  teams?: Team[]; // Made optional to support Zustand usage
  teamId?: string;
  showAvatar?: boolean;
  showActions?: boolean;
  showTableHead?: boolean;
  onNavigate?: (path: string) => void;
  useStore?: boolean; // New prop to enable Zustand store usage
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

function MembersTable({
  className,
  members = [],
  teams = [],
  teamId,
  showAvatar = true,
  showActions = true,
  showTableHead = true,
  onNavigate,
  useStore = false,
  ...props
}: MembersTableProps) {
  // Fetch data from store if useStore is true
  const { data: storeTeamData, isLoading: storeTeamLoading, error: storeTeamError } = useTeamPerformanceQuery(
    useStore && teamId ? teamId : ''
  );
  const { data: storeTeamsData, isLoading: storeTeamsLoading, error: storeTeamsError } = useAllTeams();

  // Determine effective data source
  const effectiveMembers = React.useMemo(() => {
    if (useStore) {
      if (storeTeamData?.members) {
        return storeTeamData.members;
      }
      return [];
    }
    return members;
  }, [useStore, storeTeamData, members]);

  const effectiveTeams = React.useMemo(() => {
    if (useStore) {
      return storeTeamsData || [];
    }
    return teams;
  }, [useStore, storeTeamsData, teams]);

  // Show loading state when using store
  if (useStore && (storeTeamLoading || storeTeamsLoading)) {
    return (
      <div className={cn("w-full", className)} {...props}>
        <div className="flex items-center justify-center py-8">
          <div className="text-foreground-muted">Loading members...</div>
        </div>
      </div>
    );
  }

  // Show error state when using store
  if (useStore && (storeTeamError || storeTeamsError)) {
    return (
      <div className={cn("w-full", className)} {...props}>
        <div className="flex items-center justify-center py-8">
          <div className="text-destructive">
            Error loading data: {storeTeamError?.message || storeTeamsError?.message}
          </div>
        </div>
      </div>
    );
  }

  const showTeamColumn = effectiveTeams.length > 1;

  const sortedMembers = [...effectiveMembers].sort((a, b) => {
    if (a.ratingsCount === 0 && b.ratingsCount === 0) return 0;
    if (a.ratingsCount === 0) return 1;
    if (b.ratingsCount === 0) return -1;
    return b.averageRating - a.averageRating;
  });

  // Debug logging for troubleshooting
  React.useEffect(() => {
    if (useStore) {
      console.log('MembersTable (useStore=true) Debug:', {
        teamId,
        storeTeamData,
        storeTeamsData,
        effectiveMembers,
        effectiveTeams,
        sortedMembers
      });
    } else {
      console.log('MembersTable (useStore=false) Debug:', {
        members,
        teams,
        effectiveMembers,
        effectiveTeams,
        sortedMembers
      });
    }
  }, [useStore, teamId, storeTeamData, storeTeamsData, members, teams, effectiveMembers, effectiveTeams, sortedMembers]);

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
          {sortedMembers.map((member) => {
            const effectiveTeamId = teamId || member.teamId;
            const detailsPath = `/dashboard/teams/${encodeURIComponent(
              effectiveTeamId
            )}/members/${encodeURIComponent(member.id)}`;
            const teamName = effectiveTeams.find(
              (team) => team.id === member.teamId
            )?.name;
            const teamNameDisplay = teamName || (
              <span className="text-unavailable">No team</span>
            );

            const handleRowClick = () => {
              if (onNavigate) {
                onNavigate(detailsPath);
              }
            };

            console.log(member,'member------------------');

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
                    variant={(member.trend as TrendVariant) || "stable"}
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

export { MembersTable };