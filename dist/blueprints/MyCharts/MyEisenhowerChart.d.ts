interface EisenhowerChartProps<T> {
    items: T[];
    width?: number;
    height?: number;
    xKey?: keyof T;
    yKey?: keyof T;
    label?: (keyof T)[];
    xRange?: [number, number];
    yRange?: [number, number];
}
export declare const MyEisenhowerChart: <T extends Record<string, any>>({ items, xKey, yKey, label, xRange, yRange, }: EisenhowerChartProps<T>) => import("react/jsx-runtime").JSX.Element;
export {};
