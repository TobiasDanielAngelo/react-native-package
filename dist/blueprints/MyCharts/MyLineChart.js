import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { COLORS, filterChartDataByFields, useTrendChart, } from ".";
import { MyMultiDropdownSelector } from "../MyMultiDropdownSelector";
export const MyLineChart = observer(({ data, traceKey, xKey, yKey, yPrefix, ySuffix, itemMap, formatter, excludedFromTotal, selectionLabel, noTotal, title = "", }) => {
    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width || (height < width && height < 600);
    const ratio = 0.7;
    const chartWidth = isPortrait ? 0.93 * width : (1 / (ratio + 1.1)) * width;
    const { allTraceKeys, transformedData, shownFields, setShownFields } = useTrendChart(data, traceKey ?? "", xKey, yKey, itemMap, excludedFromTotal, noTotal);
    const filteredData = filterChartDataByFields(transformedData, shownFields);
    return (_jsxs(View, { children: [_jsx(MyMultiDropdownSelector, { value: shownFields, onChangeValue: (t) => setShownFields(t), options: allTraceKeys.map((s) => ({ id: s, name: s })), label: selectionLabel ?? "Items", isAll: true }), !filteredData.datasets.length ? (_jsx(_Fragment, {})) : (_jsxs(_Fragment, { children: [_jsx(LineChart, { onDataPointClick: ({ value, dataset, getColor, index }) => {
                            // do something like show tooltip or alert
                            console.log(`Clicked value: ${value} at index ${index}`);
                        }, data: filteredData, width: chartWidth, height: height * 0.45, yAxisLabel: yPrefix, yAxisSuffix: ySuffix, yAxisInterval: 1, chartConfig: {
                            backgroundGradientFrom: "teal",
                            backgroundGradientTo: "teal",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                            },
                        }, verticalLabelRotation: -45, xLabelsOffset: 20, style: {
                            marginVertical: 8,
                            borderRadius: 16,
                            padding: 20,
                        } }), _jsx(View, { style: { flexDirection: "row", flexWrap: "wrap" }, children: filteredData.legend?.map((label, index) => (_jsxs(View, { style: {
                                alignItems: "center",
                                marginHorizontal: 8,
                                marginBottom: 8,
                            }, children: [_jsx(View, { style: {
                                        width: 12,
                                        height: 12,
                                        backgroundColor: COLORS[index % COLORS.length],
                                        borderRadius: 6,
                                    } }), _jsx(Text, { style: { fontSize: 12, marginTop: 4 }, children: label })] }, index))) })] }))] }));
});
const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    body: {
        flex: 1,
    },
    bar: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
});
