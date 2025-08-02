import { KV } from "../../constants/interfaces";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";
export type MyTrendChartProps<T extends Record<string, any>> = {
    data: T[];
    traceKey?: keyof T;
    xKey: keyof T;
    yKey: keyof T;
    yPrefix?: string;
    ySuffix?: string;
    width?: string | number;
    height?: string | number;
    colors?: string[];
    itemMap?: KV<any>[];
    formatter?: (value: number, name: string) => string[];
    excludedFromTotal?: string[];
    selectionLabel?: string;
    noTotal?: boolean;
    title?: string;
};
export type MyCircleChartProps<T extends Record<string, any>> = {
    data: T[];
    traceKey: keyof T;
    nameKey: keyof T;
    dataKey: keyof T;
    width?: string | number;
    height?: string | number;
    colors?: string[];
    itemMap?: KV<any>[];
    formatter?: (value: number, name: string) => string[];
    selectionLabel?: string;
    title?: string;
};
export declare function moveKeysToFront(obj: Record<string, any>, keys: string[]): Record<string, any>;
export declare function transformForTrendChart<T extends Record<string, any>>(data: T[], traceKey: keyof T, xAxis: keyof T, yAxis: keyof T, totalTitle: string, excludedFromTotal?: string[], noTotal?: boolean): {
    transformedData: LineChartData;
    legend: string[];
};
export declare function filterChartDataByFields(data: LineChartData, shownFields: string[]): LineChartData;
export declare const COLORS: string[];
export declare const useTrendChart: <T extends Record<string, any>>(data: T[], traceKey: keyof T, xKey: keyof T, yKey: keyof T, itemMap?: KV<any>[], excludedFromTotal?: string[], noTotal?: boolean) => {
    allTraceKeys: string[];
    transformedData: LineChartData;
    shownFields: string[];
    setShownFields: import("react").Dispatch<import("react").SetStateAction<string[]>>;
};
export declare const useCircleChart: <T extends Record<string, any>>(data: T[], nameKey: keyof T, dataKey: keyof T, traceKey: keyof T, itemMap?: KV<any>[]) => {
    resolvedData: {
        [x: string]: any;
        color: string;
        legendFontColor: string;
        legendFontSize: number;
    }[];
    selectedField: number;
    setSelectedField: import("react").Dispatch<import("react").SetStateAction<number>>;
};
