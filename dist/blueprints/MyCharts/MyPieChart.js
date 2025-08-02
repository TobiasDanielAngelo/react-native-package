import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { COLORS, useCircleChart } from ".";
import { formatValue } from "../../constants/JSXHelpers";
import { mySum } from "../../constants/helpers";
import { MyDropdownSelector } from "../MyDropdownSelector";
const data = [
    {
        name: "Seoul",
        population: 21500000,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
    },
    {
        name: "Toronto",
        population: 2800000,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
    },
    {
        name: "Beijing",
        population: 527612,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
    },
    {
        name: "New York",
        population: 8538000,
        color: "#ffffff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
    },
    {
        name: "Moscow",
        population: 11920000,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
    },
];
export const MyPieChart = observer(({ data, colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"], dataKey, nameKey, traceKey, itemMap, formatter, selectionLabel, title = "", }) => {
    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width;
    const ratio = 0.5;
    const chartWidth = isPortrait ? 0.93 * width : (1 / (ratio + 1.1)) * width;
    const { selectedField, setSelectedField, resolvedData } = useCircleChart(data, nameKey, dataKey, traceKey, itemMap);
    return (_jsxs(View, { style: { justifyContent: "center", alignItems: "center" }, children: [_jsx(View, { style: { width: width }, children: _jsx(MyDropdownSelector, { value: selectedField, onChangeValue: setSelectedField, options: Array.from(new Set(data.map((s) => s[traceKey]))).map((s) => ({
                        id: s,
                        name: formatValue(s, traceKey, [], itemMap?.find((s) => s.key === traceKey)),
                    })), label: selectionLabel ?? "Traces" }) }), _jsx(PieChart, { data: resolvedData, width: 0.5 * height, height: 0.5 * height, accessor: dataKey, backgroundColor: "transparent", paddingLeft: isPortrait ? "90" : `50`, hasLegend: false, chartConfig: {
                    backgroundGradientFrom: "transparent",
                    backgroundGradientTo: "white",
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
                } }), _jsx(View, { style: {
                    flexDirection: "row",
                    flexWrap: "wrap",
                }, children: resolvedData
                    .sort((a, b) => b[dataKey] - a[dataKey])
                    .map((s, ind, arr) => (_jsxs(View, { style: {
                        alignItems: "center",
                        marginHorizontal: 8,
                        marginBottom: 8,
                    }, children: [_jsx(View, { style: {
                                width: 12,
                                height: 12,
                                backgroundColor: COLORS[ind % COLORS.length],
                                borderRadius: 6,
                            } }), _jsx(Text, { style: { fontSize: 12, marginTop: 4 }, children: s[nameKey] }), _jsxs(Text, { style: { fontSize: 12, marginTop: 4 }, children: [Math.round((s[dataKey] /
                                    mySum(arr.map((t) => t[dataKey]))) *
                                    1000) / 10, "%"] })] }, ind))) })] }));
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
