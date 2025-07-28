"use client";

import React, { ReactNode } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
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
interface BaseAreaChartProps {
  data: any[];
  xKey: string;
  yKeys: string[];
  labelKeys?: string[];
  height?: number | string;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  showLegend?: boolean;
  customLegend?: React.ReactElement | ((props: any) => React.ReactElement);
  variant?: 'primary' | 'sequential' | 'categorical' | 'divergent';
  domain?: [number | 'auto' | 'dataMin' | 'dataMax', number | 'auto' | 'dataMin' | 'dataMax'];
  stacked?: boolean;
  curved?: boolean;
  showDots?: boolean;
  customDot?: React.ReactElement | ((props: any) => React.ReactElement);
  noDataMessage?: string;
  minDataPoints?: number;
  infoPopoverContent?: React.ReactNode;
}

// Enhanced interface with typography options
interface EnhancedBaseAreaChartProps extends BaseAreaChartProps {
  typography?: TypographyConfig;
  showDataLabels?: boolean;
  dataLabelPosition?: 'top' | 'center' | 'bottom' | 'inside' | 'outside';
  dataLabelFormatter?: (value: any, name: string) => string;
  nameDisplayMode?: 'full' | 'initials' | 'lastInitial' | 'firstNameLastInitial';
  isNameData?: boolean; // Flag to indicate if xKey data contains names
  customColors?: string[]; // Override default color palette
  strokeWidth?: number; // Customizable stroke width
  fillOpacity?: number; // Customizable fill opacity
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

// Custom data label component using your theme system
const CustomDataLabel = ({ 
  x, 
  y, 
  value, 
  position = 'top',
  typography,
  isNameData = false,
  nameDisplayMode = 'lastInitial'
}: {
  x: number;
  y: number;
  value: any;
  position?: 'top' | 'center' | 'bottom' | 'inside' | 'outside';
  typography: any;
  isNameData?: boolean;
  nameDisplayMode?: 'full' | 'initials' | 'lastInitial';
}) => {
  if (!value || value === 0) return null;

  // Use your design system values with fallbacks
  const fontSize = typography?.fontSize?.dataLabel ?? 11;
  const fontFamily = typography?.fontFamily?.dataLabel ?? 'var(--font-sans)';
  const fontWeight = typography?.fontWeight?.dataLabel ?? 500;
  const fill = typography?.colors?.dataLabel ?? 'var(--color-foreground)';

  // Format the display value based on whether it's name data
  const displayValue = isNameData 
    ? formatNameForDisplay(String(value), nameDisplayMode)
    : value;

  // Calculate position based on position prop
  let labelX = x;
  let labelY = y;
  let textAnchor: 'start' | 'middle' | 'end' = 'middle';

  switch (position) {
    case 'top':
      labelY = y - 8;
      break;
    case 'center':
      // y position stays the same
      break;
    case 'bottom':
      labelY = y + 16;
      break;
    case 'inside':
      // y position stays the same
      break;
    case 'outside':
      labelY = y - 8;
      break;
  }

  return (
    <text
      x={labelX}
      y={labelY}
      fill={fill}
      fontSize={fontSize}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      textAnchor={textAnchor}
      dominantBaseline="middle"
      className="select-none"
    >
      {displayValue}
    </text>
  );
};

export function EnhancedBaseAreaChart({
  data,
  xKey,
  yKeys,
  labelKeys,
  height = 300,
  margin = { top: 20, right: 0, left: -20, bottom: 20 },
  showLegend = true,
  customLegend,
  variant = 'categorical',
  domain,
  stacked = false,
  curved = true,
  showDots = false,
  customDot,
  noDataMessage = "No data available",
  minDataPoints = 1,
  infoPopoverContent,
  typography = {},
  showDataLabels = false,
  dataLabelPosition = 'top',
  dataLabelFormatter,
  nameDisplayMode = 'firstNameLastInitial',
  isNameData = false,
  customColors,
  strokeWidth = 2,
  fillOpacity = 0.6,
}: EnhancedBaseAreaChartProps) {
  
  // Check if we have insufficient data
  const hasInsufficientData = !data || data.length === 0 || 
    data.every(item => yKeys.every(key => !item[key] || item[key] === 0)) ||
    data.length < minDataPoints;

  // Sample data for no-data state (grayscale preview)
  const sampleData = [
    { period: "Period 1", area1: 45, area2: 65 },
    { period: "Period 2", area1: 52, area2: 58 },
    { period: "Period 3", area1: 48, area2: 72 },
  ];

  // Use sample data when there's no real data, map to expected structure
  const chartData = hasInsufficientData 
    ? sampleData.map(item => {
        const mapped: any = { [xKey]: item.period };
        yKeys.forEach((key, index) => {
          mapped[key] = item[`area${index + 1}` as keyof typeof item] || 0;
        });
        return mapped;
      })
    : data?.map(item => {
        // Apply name formatting to the xKey field if it's name data
        if (isNameData && item[xKey]) {
          return {
            ...item,
            [xKey]: formatNameForDisplay(String(item[xKey]), nameDisplayMode),
            [`${xKey}_original`]: item[xKey], // Keep original for tooltip
          };
        }
        return item;
      }) || [];

  const { getColorPalette, chartDefaults, getLegendEffectOpacity, isDark } = useChartStyles({
    variant,
    colorCount: yKeys.length
  });
  
  // Get colors - use custom colors if provided, otherwise use default palette
  const colors = hasInsufficientData 
    ? yKeys.map((_, index) => {
        const shades = [
          'var(--color-neutral-300)',
          'var(--color-neutral-400)', 
          'var(--color-neutral-500)',
          'var(--color-neutral-600)'
        ];
        return shades[index % shades.length];
      })
    : customColors && customColors.length > 0
      ? yKeys.map((_, index) => customColors[index % customColors.length])
      : getColorPalette(yKeys.length);
  
  const legendEffect = getLegendEffectOpacity();
  
  // Generate unique ID for this chart instance
  const uniqueId = React.useId();

  // Enhanced typography configuration using your design system
  const typographyConfig = {
    fontSize: {
      axis: typography.fontSize?.axis ?? chartDefaults.labelFontSize ?? 12,
      tick: typography.fontSize?.tick ?? chartDefaults.labelFontSize ?? 11,
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
    const originalName = dataItem?.[`${xKey}_original`] || label;

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
            const keyIndex = yKeys.indexOf(entry.dataKey);
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

  // Default dot component with your design system
  const DefaultDot = (props: any) => {
    const { cx, cy, stroke, index } = props;
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={4}
        stroke={stroke}
        strokeWidth={1}
        fill="var(--color-background)"
        opacity={hasInsufficientData ? 0.6 : 1}
        className="transition-opacity duration-200"
      />
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
          <AreaChart data={chartData} margin={margin}>
            {/* Define Gradients With Unique IDs */}
            <defs>
              {colors.map((color, index) => {
                const gradientId = `chart-gradient-${uniqueId}-${index}`;
                
                return (
                  <linearGradient
                    key={gradientId}
                    id={gradientId}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor={color}
                      stopOpacity={hasInsufficientData ? 0.4 : fillOpacity}
                    />
                    <stop
                      offset="100%"
                      stopColor={color}
                      stopOpacity={hasInsufficientData ? 0.1 : fillOpacity * 0.3}
                    />
                  </linearGradient>
                );
              })}
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={chartDefaults.stroke ?? 'var(--chart-grid)'} 
            />
            
            <XAxis 
              dataKey={xKey} 
              axisLine={{ stroke: chartDefaults.axisColor ?? 'var(--chart-axis)' }}
              tickLine={{ stroke: chartDefaults.axisColor ?? 'var(--chart-axis)' }}
              tick={{
                fontSize: typographyConfig.fontSize.axis,
                fill: typographyConfig.colors.axis,
                fontFamily: typographyConfig.fontFamily.axis,
                fontWeight: typographyConfig.fontWeight.axis,
              }}
            />
            
            <YAxis 
              domain={domain || ['auto', 'auto']}
              axisLine={{ stroke: chartDefaults.axisColor ?? 'var(--chart-axis)' }}
              tickLine={{ stroke: chartDefaults.axisColor ?? 'var(--chart-axis)' }}
              tick={{
                fontSize: typographyConfig.fontSize.tick,
                fill: typographyConfig.colors.tick,
                fontFamily: typographyConfig.fontFamily.tick,
                fontWeight: typographyConfig.fontWeight.tick,
              }}
            />
            
            {!hasInsufficientData && (
              <Tooltip 
                content={renderTooltipContent} 
                cursor={{ fill: 'var(--color-muted)' }} 
              />
            )}
            
            {showLegend && !hasInsufficientData && (
              <Legend content={customLegend || renderLegend} />
            )}
            
            {yKeys.map((dataKey, index) => (
              <Area
                key={dataKey}
                type={curved ? "monotone" : "linear"}
                dataKey={dataKey}
                stroke={colors[index]}
                strokeWidth={chartDefaults.strokeWidth ?? strokeWidth}
                fill={`url(#chart-gradient-${uniqueId}-${index})`}
                stackId={stacked ? "stack" : undefined}
                name={dataKey}
                dot={showDots ? (customDot || <DefaultDot />) : false}
                activeDot={hasInsufficientData ? false : { 
                  r: 6, 
                  strokeWidth: 0,
                  fill: colors[index],
                  className: "transition-all duration-200"
                }}
                animationDuration={hasInsufficientData ? 0 : 750}
                label={showDataLabels && !hasInsufficientData ? (props: any) => (
                  <CustomDataLabel 
                    {...props} 
                    position={dataLabelPosition}
                    typography={typographyConfig}
                    isNameData={isNameData}
                    nameDisplayMode={nameDisplayMode}
                  />
                ) : false}
              />
            ))}
          </AreaChart>
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
            chartType="area chart"
          />
        </>
      )}
    </div>
  );
}

// Export the enhanced component with the correct interface
export { EnhancedBaseAreaChart as BaseAreaChart };