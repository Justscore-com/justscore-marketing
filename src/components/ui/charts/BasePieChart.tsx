"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useChartStyles } from "@/hooks/useChartStyles";
import { NoChartsData, NoChartsDataAnnouncement } from "@/components/ui/charts/NoChartsData";

// Extended interface for typography customization using your design system
interface TypographyConfig {
  fontSize?: {
    label?: number;
    tooltip?: number;
    legend?: number;
  };
  fontFamily?: {
    label?: string;
    tooltip?: string;
    legend?: string;
  };
  fontWeight?: {
    label?: number | string;
    tooltip?: number | string;
    legend?: number | string;
  };
  colors?: {
    label?: string;
    tooltip?: string;
    legend?: string;
  };
  spacing?: {
    tooltip?: string;
    legend?: string;
  };
}

// Enhanced data type for better type safety
interface PieDataItem {
  name: string;
  value: number;
  [key: string]: any;
}

// Enhanced data item with original name preservation
interface EnhancedPieDataItem extends PieDataItem {
  name_original?: string;
}

// Base interface from your original component
interface BasePieChartProps {
  data: PieDataItem[];
  dataKey?: string;
  nameKey?: string;
  labelKeys?: string[]; // Custom labels for data entries
  height?: number | string;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  showLegend?: boolean;
  customLegend?: React.ReactElement | ((props: any) => React.ReactElement);
  variant?: 'primary' | 'sequential' | 'categorical' | 'divergent';
  showLabels?: boolean;
  labelType?: 'name' | 'value' | 'percent' | 'name-percent';
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  noDataMessage?: string;
  minDataPoints?: number;
  infoPopoverContent?: React.ReactNode;
}

// Enhanced interface with typography options
interface EnhancedBasePieChartProps extends BasePieChartProps {
  typography?: TypographyConfig;
  nameDisplayMode?: 'full' | 'initials' | 'lastInitial' | 'firstNameLastInitial';
  isNameData?: boolean; // Flag to indicate if data contains names
  customColors?: string[]; // Override default color palette
  strokeWidth?: number; // Customizable stroke width
  hoverEffect?: 'brightness' | 'scale' | 'opacity' | 'none'; // Hover effect type
  cornerRadius?: number; // Rounded corners for pie segments
  labelPosition?: 'inside' | 'outside' | 'edge'; // Label positioning
  labelFormatter?: (value: number, name: string, percent: number) => string;
  showConnectors?: boolean; // Show label connector lines
  minLabelPercent?: number; // Minimum percentage to show labels
}

// Utility function to format names for display
const formatNameForDisplay = (name: string, mode: 'full' | 'initials' | 'lastInitial' | 'firstNameLastInitial' = 'full'): string => {
  if (!name || typeof name !== 'string') return name;
  
  const trimmedName = name.trim();
  if (!trimmedName) return name;
  
  switch (mode) {
    case 'initials': {
      return trimmedName
        .split(/\s+/)
        .filter(part => part.length > 0)
        .map(part => part.charAt(0).toUpperCase())
        .join('.') + '.';
    }
    
    case 'lastInitial': {
      const parts = trimmedName.split(/\s+/).filter(part => part.length > 0);
      if (parts.length === 0) return name;
      const lastPart = parts[parts.length - 1];
      return lastPart.charAt(0).toUpperCase() + '.';
    }

    case 'firstNameLastInitial': {
      const parts = trimmedName.split(/\s+/).filter(part => part.length > 0);
      if (parts.length === 0) return name;
      if (parts.length === 1) return parts[0];
      
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

export function EnhancedBasePieChart({
  data,
  dataKey = 'value',
  nameKey = 'name',
  labelKeys,
  height = 300,
  innerRadius = 0,
  outerRadius = 90,
  paddingAngle = 0,
  showLegend = true,
  customLegend,
  variant = 'categorical',
  showLabels = true,
  labelType = 'name-percent',
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
  noDataMessage = "No data available",
  minDataPoints = 1,
  infoPopoverContent,
  typography = {},
  nameDisplayMode = 'firstNameLastInitial',
  isNameData = false,
  customColors,
  strokeWidth = 1,
  hoverEffect = 'brightness',
  cornerRadius = 0,
  labelPosition = 'outside',
  labelFormatter,
  showConnectors = true,
  minLabelPercent = 5,
}: EnhancedBasePieChartProps) {
  
  // Check if we have insufficient data
  const hasInsufficientData = !data || data.length === 0 || 
    data.every(item => !item[dataKey as keyof PieDataItem] || item[dataKey as keyof PieDataItem] === 0) ||
    data.length < minDataPoints;

  // Sample data for no-data state (grayscale preview)
  const sampleData: PieDataItem[] = [
    { name: "Category A", value: 35 },
    { name: "Category B", value: 25 },
    { name: "Category C", value: 20 },
    { name: "Category D", value: 15 },
    { name: "Category E", value: 5 },
  ];

  // Use sample data when there's no real data, map to expected structure
  const chartData: EnhancedPieDataItem[] = hasInsufficientData 
    ? sampleData
    : data.map(item => {
        // Apply name formatting to the nameKey field if it's name data
        if (isNameData && item[nameKey as keyof PieDataItem]) {
          const originalName = String(item[nameKey as keyof PieDataItem]);
          return {
            ...item,
            [nameKey]: formatNameForDisplay(originalName, nameDisplayMode),
            [`${nameKey}_original`]: originalName, // Keep original for tooltip
          } as EnhancedPieDataItem;
        }
        return item as EnhancedPieDataItem;
      });
  
  const { getColorPalette, chartDefaults, isDark } = useChartStyles({
    variant,
    colorCount: chartData.length
  });
  
  // Get colors - use custom colors if provided, otherwise use default palette
  const colors = hasInsufficientData 
    ? chartData.map((_, index) => {
        const shades = [
          'var(--color-neutral-300)',
          'var(--color-neutral-400)', 
          'var(--color-neutral-500)',
          'var(--color-neutral-600)'
        ];
        return shades[index % shades.length];
      })
    : customColors && customColors.length > 0
      ? chartData.map((_, index) => customColors[index % customColors.length])
      : getColorPalette(chartData.length);
  
  // Track active index for hover effect
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Enhanced typography configuration using your design system
  const typographyConfig = {
    fontSize: {
      label: typography.fontSize?.label ?? 12,
      tooltip: typography.fontSize?.tooltip ?? 13,
      legend: typography.fontSize?.legend ?? 12,
    },
    fontFamily: {
      label: typography.fontFamily?.label ?? 'var(--font-sans)',
      tooltip: typography.fontFamily?.tooltip ?? 'var(--font-sans)',
      legend: typography.fontFamily?.legend ?? 'var(--font-sans)',
    },
    fontWeight: {
      label: typography.fontWeight?.label ?? 500,
      tooltip: typography.fontWeight?.tooltip ?? 500,
      legend: typography.fontWeight?.legend ?? 400,
    },
    colors: {
      label: typography.colors?.label ?? 'var(--color-foreground)',
      tooltip: typography.colors?.tooltip ?? 'var(--color-foreground-strong)',
      legend: typography.colors?.legend ?? 'var(--color-foreground)',
    },
    spacing: {
      tooltip: typography.spacing?.tooltip ?? 'content-padding',
      legend: typography.spacing?.legend ?? 'section-gap',
    },
  };

  // Custom tooltip content with enhanced typography using your design system
  const renderTooltipContent = (props: any) => {
    // Don't show tooltip in no-data state
    if (hasInsufficientData) return null;
    
    const { active, payload } = props;
    
    if (!active || !payload || !payload.length) {
      return null;
    }

    const data = payload[0];
    const entry = data.payload as EnhancedPieDataItem;
    const value = data.value || 0;
    const percent = (data.percent || 0) * 100;

    // Get the original name from the data item if available
    const originalName = entry.name_original || entry[nameKey as keyof EnhancedPieDataItem] as string;

    // Get custom label if provided
    const entryIndex = chartData.findIndex(item => item === entry);
    const displayLabel = labelKeys && labelKeys[entryIndex] 
      ? labelKeys[entryIndex] 
      : originalName;

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
          {displayLabel}
        </p>
        <div className="content-stack">
          <div className="flex items-center gap-2 body-sm">
            <span 
              className="inline-block size-2.5 rounded-full flex-shrink-0" 
              style={{ backgroundColor: data.color }}
            />
            <span className="truncate">
              <span className="label-sm">Value:</span>{' '}
              <span className="body-sm">{value}</span>
              <span className="text-foreground-muted ml-1">({percent.toFixed(1)}%)</span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Custom legend renderer with your design system classes
  const renderLegend = (props: any) => {
    const { payload } = props;
    
    if (!payload) return null;

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
              onMouseEnter={() => !hasInsufficientData && setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
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

  // Custom label renderer with better positioning and typography
  const renderCustomizedLabel = (props: any): JSX.Element | null => {
    // Don't show labels in no-data state
    if (hasInsufficientData) return null;
    
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, value, index } = props;
    
    // Type guards and validation
    if (typeof cx !== 'number' || typeof cy !== 'number' || 
        typeof midAngle !== 'number' || typeof innerRadius !== 'number' || 
        typeof outerRadius !== 'number' || typeof percent !== 'number' ||
        typeof index !== 'number') {
      return null;
    }
    
    // Only show label for segments with enough area
    if (percent < (minLabelPercent / 100)) return null;

    // Calculate label position based on labelPosition prop
    let radius: number;
    switch (labelPosition) {
      case 'inside':
        radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        break;
      case 'edge':
        radius = outerRadius + 5;
        break;
      case 'outside':
      default:
        radius = innerRadius + (outerRadius - innerRadius) * 1.5;
        break;
    }

    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-midAngle * RADIAN);
    const cos = Math.cos(-midAngle * RADIAN);
    const x = cx + radius * cos;
    const y = cy + radius * sin;
    
    // Get the original name and format label
    const entry = chartData[index];
    const originalName = entry.name_original || entry[nameKey as keyof EnhancedPieDataItem] as string;
    const displayName = labelKeys && labelKeys[index] ? labelKeys[index] : originalName;

    let label = '';
    if (labelFormatter && typeof value === 'number') {
      label = labelFormatter(value, displayName, percent * 100);
    } else {
      switch (labelType) {
        case 'name':
          label = displayName;
          break;
        case 'value':
          label = String(value);
          break;
        case 'percent':
          label = `${(percent * 100).toFixed(0)}%`;
          break;
        case 'name-percent':
        default:
          label = `${displayName}: ${(percent * 100).toFixed(0)}%`;
      }
    }
  
    // Determine text anchor based on position in the circle
    const textAnchor = labelPosition === 'inside' ? 'middle' : (x > cx ? 'start' : 'end');
  
    return (
      <text 
        x={x} 
        y={y} 
        fill={typographyConfig.colors.label}
        textAnchor={textAnchor} 
        dominantBaseline="central"
        fontSize={typographyConfig.fontSize.label}
        fontFamily={typographyConfig.fontFamily.label}
        fontWeight={typographyConfig.fontWeight.label}
        className="select-none"
      >
        {label}
      </text>
    );
  };

  // Apply hover effect styles
  const getHoverStyle = (index: number, isActive: boolean): React.CSSProperties => {
    if (hasInsufficientData || hoverEffect === 'none') return {};
    
    switch (hoverEffect) {
      case 'brightness':
        return {
          filter: isActive ? 'brightness(0.85)' : undefined,
        };
      case 'scale':
        return {
          transform: isActive ? 'scale(1.05)' : undefined,
          transformOrigin: 'center',
        };
      case 'opacity':
        return {
          opacity: activeIndex === null || isActive ? 1 : 0.7,
        };
      default:
        return {};
    }
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
          <PieChart margin={margin}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={showLabels && showConnectors && !hasInsufficientData ? {
                stroke: typographyConfig.colors.label,
                strokeWidth: 1,
              } : false}
              label={showLabels ? renderCustomizedLabel : false}
              outerRadius={outerRadius}
              innerRadius={innerRadius}
              paddingAngle={paddingAngle}
              dataKey={dataKey}
              nameKey={nameKey}
              cornerRadius={cornerRadius}
              isAnimationActive={!hasInsufficientData}
              animationDuration={hasInsufficientData ? 0 : 750}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index]} 
                  stroke={isDark ? 'var(--color-neutral-800)' : 'var(--color-background)'}
                  strokeWidth={strokeWidth}
                  style={{
                    ...getHoverStyle(index, activeIndex === index),
                    cursor: hasInsufficientData ? 'default' : 'pointer',
                    transition: 'all 0.2s ease-in-out',
                  }}
                  onMouseEnter={() => !hasInsufficientData && setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                />
              ))}
            </Pie>
            
            {!hasInsufficientData && (
              <Tooltip 
                content={renderTooltipContent}
                cursor={{ fill: 'transparent' }}
              />
            )}
            
            {showLegend && !hasInsufficientData && (
              <Legend content={customLegend || renderLegend} />
            )}
          </PieChart>
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
            chartType="pie chart"
          />
        </>
      )}
    </div>
  );
}

// Export the enhanced component with the correct interface
export { EnhancedBasePieChart as BasePieChart };