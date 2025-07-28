"use client";

import React, { ReactNode } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useChartStyles } from "@/hooks/useChartStyles";
import { NoChartsData, NoChartsDataAnnouncement } from "@/components/ui/charts/NoChartsData";

// Extended interface for typography customization using your design system
interface TypographyConfig {
  fontSize?: {
    axis?: number;
    tick?: number;
    tooltip?: number;
    legend?: number;
    dataLabel?: number;
  };
  fontFamily?: {
    axis?: string;
    tick?: string;
    tooltip?: string;
    legend?: string;
    dataLabel?: string;
  };
  fontWeight?: {
    axis?: number | string;
    tick?: number | string;
    tooltip?: number | string;
    legend?: number | string;
    dataLabel?: number | string;
  };
  colors?: {
    axis?: string;
    tick?: string;
    tooltip?: string;
    legend?: string;
    dataLabel?: string;
  };
  spacing?: {
    tooltip?: string;
    legend?: string;
    dataLabel?: string;
  };
}

// Base interface from your original component
interface BaseRadarChartProps {
  data: any[];
  dataKeys: string[];
  labelKey: string;
  labelKeys?: string[]; // Custom labels for data keys
  height?: number | string;
  showLegend?: boolean;
  customLegend?: React.ReactElement | ((props: any) => React.ReactElement);
  variant?: 'primary' | 'sequential' | 'categorical' | 'divergent';
  outerRadius?: number;
  domain?: [number, number];
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  noDataMessage?: string;
  minDataPoints?: number;
  infoPopoverContent?: React.ReactNode;
}

// Enhanced interface with typography options
interface EnhancedBaseRadarChartProps extends BaseRadarChartProps {
  typography?: TypographyConfig;
  showDataLabels?: boolean;
  dataLabelFormatter?: (value: any, name: string) => string;
  nameDisplayMode?: 'full' | 'initials' | 'lastInitial' | 'firstNameLastInitial';
  isNameData?: boolean; // Flag to indicate if labelKey data contains names
  customColors?: string[]; // Override default color palette
  strokeWidth?: number; // Customizable stroke width
  fillOpacity?: number; // Customizable fill opacity
  gridType?: 'polygon' | 'circle'; // Grid shape
  showGrid?: boolean; // Toggle grid visibility
  showRadiusAxis?: boolean; // Toggle radius axis visibility
  angleAxisPosition?: number; // Angle for radius axis
}

// Utility function to format names for display
const formatNameForDisplay = (name: string, mode: 'full' | 'initials' | 'lastInitial' | 'firstNameLastInitial' = 'full'): string => {
  if (!name || typeof name !== 'string') return name;
  
  const trimmedName = name.trim();
  if (!trimmedName) return name;
  
  switch (mode) {
    case 'initials': {
      // Return all initials: "John Doe Smith" -> "J.D.S."
      return trimmedName
        .split(/\s+/)
        .filter(part => part.length > 0)
        .map(part => part.charAt(0).toUpperCase())
        .join('.') + '.';
    }
    
    case 'lastInitial': {
      // Return last name initial: "John Doe Smith" -> "S."
      const parts = trimmedName.split(/\s+/).filter(part => part.length > 0);
      if (parts.length === 0) return name;
      const lastPart = parts[parts.length - 1];
      return lastPart.charAt(0).toUpperCase() + '.';
    }

    case 'firstNameLastInitial': {
      // Return first name + last initial: "John Doe Smith" -> "John S."
      const parts = trimmedName.split(/\s+/).filter(part => part.length > 0);
      if (parts.length === 0) return name;
      if (parts.length === 1) return parts[0]; // Single name case
      
      const firstName = parts[0];
      const lastPart = parts[parts.length - 1];
      const lastInitial = lastPart.charAt(0).toUpperCase() + '.';
      
      return `${firstName} ${lastInitial}`;
    }
    
    case 'full':
    default:
      return trimmedName;
  }
};

export function EnhancedBaseRadarChart({
  data,
  dataKeys,
  labelKey,
  labelKeys,
  height = 300,
  showLegend = true,
  customLegend,
  variant = 'categorical',
  outerRadius = 90,
  domain,
  margin = { top: 20, right: 0, left: 0, bottom: 20 },
  noDataMessage = "No data available",
  minDataPoints = 1,
  infoPopoverContent,
  typography = {},
  showDataLabels = false,
  dataLabelFormatter,
  nameDisplayMode = 'firstNameLastInitial',
  isNameData = false,
  customColors,
  strokeWidth = 2,
  fillOpacity = 0.6,
  gridType = 'polygon',
  showGrid = true,
  showRadiusAxis = true,
  angleAxisPosition = 30,
}: EnhancedBaseRadarChartProps) {
  
  // Check if we have insufficient data
  const hasInsufficientData = !data || data.length === 0 || 
    data.every(item => dataKeys.every(key => !item[key] || item[key] === 0)) ||
    data.length < minDataPoints;

  // Sample data for no-data state (grayscale preview)
  const sampleData = [
    { subject: 'Skill A', area1: 80, area2: 90, area3: 70 },
    { subject: 'Skill B', area1: 85, area2: 75, area3: 95 },
    { subject: 'Skill C', area1: 70, area2: 85, area3: 80 },
    { subject: 'Skill D', area1: 90, area2: 80, area3: 85 },
    { subject: 'Skill E', area1: 75, area2: 95, area3: 90 },
  ];

  // Use sample data when there's no real data, map to expected structure
  const chartData = hasInsufficientData 
    ? sampleData.map(item => {
        const mapped: any = { [labelKey]: item.subject };
        dataKeys.forEach((key, index) => {
          mapped[key] = item[`area${index + 1}` as keyof typeof item] || 0;
        });
        return mapped;
      })
    : data?.map(item => {
        // Apply name formatting to the labelKey field if it's name data
        if (isNameData && item[labelKey]) {
          return {
            ...item,
            [labelKey]: formatNameForDisplay(String(item[labelKey]), nameDisplayMode),
            [`${labelKey}_original`]: item[labelKey], // Keep original for tooltip
          };
        }
        return item;
      }) || [];

  const { getColorPalette, getRadarGradients, chartDefaults, getLegendEffectOpacity, isDark } = useChartStyles({
    variant,
    colorCount: dataKeys.length
  });
  
  // Get colors - use custom colors if provided, otherwise use default palette
  const colors = hasInsufficientData 
    ? dataKeys.map((_, index) => {
        const shades = [
          'var(--color-neutral-300)',
          'var(--color-neutral-400)', 
          'var(--color-neutral-500)',
          'var(--color-neutral-600)'
        ];
        return shades[index % shades.length];
      })
    : customColors && customColors.length > 0
      ? dataKeys.map((_, index) => customColors[index % customColors.length])
      : getColorPalette(dataKeys.length);

  // Generate unique ID for this chart instance
  const uniqueId = React.useId();

  const radarGradients = getRadarGradients ? getRadarGradients(colors) : colors.map((color, index) => ({
    id: `radar-gradient-${uniqueId}-${index}`,
    color
  }));
  
  const legendEffect = getLegendEffectOpacity();

  // Enhanced typography configuration using your design system
  const typographyConfig = {
    fontSize: {
      axis: typography.fontSize?.axis ?? chartDefaults.labelFontSize ?? 12,
      tick: typography.fontSize?.tick ?? chartDefaults.labelFontSize ?? 10,
      tooltip: typography.fontSize?.tooltip ?? 13,
      legend: typography.fontSize?.legend ?? 12,
      dataLabel: typography.fontSize?.dataLabel ?? 11,
    },
    fontFamily: {
      axis: typography.fontFamily?.axis ?? 'var(--font-sans)',
      tick: typography.fontFamily?.tick ?? 'var(--font-sans)',
      tooltip: typography.fontFamily?.tooltip ?? 'var(--font-sans)',
      legend: typography.fontFamily?.legend ?? 'var(--font-sans)',
      dataLabel: typography.fontFamily?.dataLabel ?? 'var(--font-sans)',
    },
    fontWeight: {
      axis: typography.fontWeight?.axis ?? 500,
      tick: typography.fontWeight?.tick ?? 400,
      tooltip: typography.fontWeight?.tooltip ?? 500,
      legend: typography.fontWeight?.legend ?? 400,
      dataLabel: typography.fontWeight?.dataLabel ?? 500,
    },
    colors: {
      axis: typography.colors?.axis ?? chartDefaults.labelColor ?? 'var(--color-foreground)',
      tick: typography.colors?.tick ?? chartDefaults.tickColor ?? 'var(--color-foreground-weak)',
      tooltip: typography.colors?.tooltip ?? 'var(--color-foreground-strong)',
      legend: typography.colors?.legend ?? 'var(--color-foreground)',
      dataLabel: typography.colors?.dataLabel ?? 'var(--color-foreground)',
    },
    spacing: {
      tooltip: typography.spacing?.tooltip ?? 'content-padding',
      legend: typography.spacing?.legend ?? 'section-gap',
      dataLabel: typography.spacing?.dataLabel ?? 'content-stack',
    },
  };

  // Custom tooltip content with enhanced typography using your design system
  const renderTooltipContent = (props: any) => {
    // Don't show tooltip in no-data state
    if (hasInsufficientData) return null;
    
    const { active, payload, label } = props;
    
    if (!active || !payload || !payload.length) {
      return null;
    }

    // Get the original name from the data item if available
    const dataItem = payload[0]?.payload;
    const originalName = dataItem?.[`${labelKey}_original`] || label;

    return (
      <div 
        className={`
          rounded-lg bg-card border border-border shadow-md
          ${typographyConfig.spacing.tooltip}
          text-card-foreground
        `}
        style={{
          fontSize: typographyConfig.fontSize.tooltip,
          fontFamily: typographyConfig.fontFamily.tooltip,
        }}
      >
        <p 
          className="label-base mb-2"
          style={{ 
            fontWeight: typographyConfig.fontWeight.tooltip,
            color: typographyConfig.colors.tooltip 
          }}
        >
          {/* Show original full name in tooltip */}
          {originalName}
        </p>
        <div className="content-stack">
          {payload.map((entry: any, index: number) => {
            const keyIndex = dataKeys.indexOf(entry.dataKey);
            const customLabel = labelKeys && labelKeys[keyIndex] 
              ? labelKeys[keyIndex] 
              : entry.dataKey;
            
            // Always show full value in tooltip (no initials here)
            const displayValue = dataLabelFormatter 
              ? dataLabelFormatter(entry.value, customLabel)
              : entry.value;
              
            return (
              <div key={`tooltip-${index}`} className="flex items-center gap-2 body-sm">
                <span 
                  className="inline-block size-2.5 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="truncate">
                  <span className="label-sm">{customLabel}:</span>{' '}
                  <span className="body-sm">{displayValue}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Default legend renderer with your design system classes
  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <div 
        className={`
          flex flex-wrap justify-center gap-x-4 gap-y-2 pt-3
          ${typographyConfig.spacing.legend}
        `}
        style={{
          fontSize: typographyConfig.fontSize.legend,
          fontFamily: typographyConfig.fontFamily.legend,
        }}
      >
        {payload.map((entry: any, index: number) => {
          // Get the custom label if provided, otherwise use the entry value
          const label = labelKeys && labelKeys[index] 
            ? labelKeys[index] 
            : entry.value;
            
          return (
            <div
              key={`item-${index}`}
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity !mb-0"
              onMouseEnter={!hasInsufficientData ? (e) => legendEffect.onMouseEnter(entry, index, e) : undefined}
              onMouseLeave={!hasInsufficientData ? (e) => legendEffect.onMouseLeave(entry, index, e) : undefined}
            >
              <div
                className="mr-1.5 size-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: colors[index] }}
              />
              <span 
                className="body-sm"
                style={{ 
                  color: typographyConfig.colors.legend,
                  fontWeight: typographyConfig.fontWeight.legend 
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative" style={{ width: '100%', height }}>
      {/* Main Chart Container */}
      <div 
        className={`w-full h-full transition-all duration-300 ${
          hasInsufficientData ? 'filter grayscale opacity-40' : ''
        }`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius={outerRadius} data={chartData} margin={margin}>
            {/* Define Gradients With Unique IDs */}
            <defs>
              {radarGradients.map((gradient, index) => (
                <linearGradient
                  key={gradient.id || `radar-gradient-${uniqueId}-${index}`}
                  id={gradient.id || `radar-gradient-${uniqueId}-${index}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop 
                    offset="5%" 
                    stopColor={gradient.color} 
                    stopOpacity={hasInsufficientData ? 0.4 : fillOpacity}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={gradient.color} 
                    stopOpacity={hasInsufficientData ? 0.1 : fillOpacity * 0.3}
                  />
                </linearGradient>
              ))}
            </defs>
            
            {showGrid && (
              <PolarGrid 
                stroke={chartDefaults.stroke ?? 'var(--chart-grid)'} 
                gridType={gridType}
              />
            )}
            
            <PolarAngleAxis 
              dataKey={labelKey} 
              tick={{ 
                fill: typographyConfig.colors.axis,
                fontSize: typographyConfig.fontSize.axis,
                fontFamily: typographyConfig.fontFamily.axis,
                fontWeight: typographyConfig.fontWeight.axis,
              }}
            />
            
            {showRadiusAxis && (
              <PolarRadiusAxis
                angle={angleAxisPosition}
                domain={domain || [0, 'auto']}
                axisLine={false}
                tick={{ 
                  fill: typographyConfig.colors.tick,
                  fontSize: typographyConfig.fontSize.tick,
                  fontFamily: typographyConfig.fontFamily.tick,
                  fontWeight: typographyConfig.fontWeight.tick,
                }}
              />
            )}
            
            {dataKeys.map((dataKey, index) => (
              <Radar
                key={dataKey}
                name={dataKey}
                dataKey={dataKey}
                stroke={colors[index]}
                fill={`url(#${radarGradients[index]?.id || `radar-gradient-${uniqueId}-${index}`})`}
                fillOpacity={hasInsufficientData ? 0.3 : fillOpacity}
                strokeWidth={chartDefaults.strokeWidth ?? strokeWidth}
                animationDuration={hasInsufficientData ? 0 : 750}
                dot={showDataLabels && !hasInsufficientData ? {
                  fill: colors[index],
                  strokeWidth: 1,
                  stroke: 'var(--color-background)',
                  r: 4,
                } : false}
              />
            ))}
            
            {!hasInsufficientData && (
              <Tooltip 
                content={renderTooltipContent} 
                cursor={{ fill: 'var(--color-muted)' }} 
              />
            )}
            
            {showLegend && !hasInsufficientData && (
              <Legend content={customLegend || renderLegend} />
            )}
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Use the new NoChartsData component */}
      {hasInsufficientData && (
        <>
          <NoChartsData 
            message={noDataMessage}
            popoverContent={infoPopoverContent}
          />
          <NoChartsDataAnnouncement 
            message={noDataMessage}
            chartType="radar chart"
          />
        </>
      )}
    </div>
  );
}

// Export the enhanced component with the correct interface
export { EnhancedBaseRadarChart as BaseRadarChart };