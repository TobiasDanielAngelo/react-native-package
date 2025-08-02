import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useWindowDimensions, View } from "react-native";
import Svg, { Line, Text as SVGText } from "react-native-svg";
import { useVisible } from "../../constants/hooks";
import { MyModal } from "../MyModal";
import { Text } from "react-native";
const normalize = (v, min, max) => {
    if (min === max)
        return 100;
    return ((v - min) / (max - min)) * 100;
};
const Point = (props) => {
    const { normX, normY, urgency, importance, modalContent } = props;
    const { isVisible1, setVisible1 } = useVisible();
    return (_jsxs(_Fragment, { children: [_jsx(MyModal, { isVisible: isVisible1, setVisible: setVisible1, children: modalContent }), _jsxs(SVGText, { x: normX, y: normY, fontSize: "50", textAnchor: "middle", onPress: () => setVisible1(true), stroke: "yellow", fill: "yellow", children: ["\u2022", _jsx(SVGText, { x: normX, y: normY + 5, fontSize: "10", stroke: "black", children: `(${urgency}, ${importance})` })] })] }));
};
export const MyEisenhowerChart = ({ items, xKey = "x", yKey = "y", label = ["label"], xRange, yRange, }) => {
    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width || (height < width && height < 600);
    const ratio = 0.7;
    const chartWidth = isPortrait ? 0.93 * width : (1 / (ratio + 1.1)) * width;
    const chartHeight = 0.6 * height;
    const getRange = (key) => {
        const values = items.map((d) => d[key]);
        const min = Math.min(...values);
        const max = Math.max(...values);
        return [min, max];
    };
    const padding = 10;
    const computedXRange = xRange ?? getRange(xKey);
    const computedYRange = yRange ?? getRange(yKey);
    const getNormValues = (point) => {
        const x = point[xKey];
        const y = point[yKey];
        const pad = 3 * padding;
        const usableWidth = chartWidth - 2 * pad;
        const usableHeight = chartHeight - 2 * pad;
        const normX = pad +
            (normalize(x, computedXRange[0], computedXRange[1]) * usableWidth) / 100;
        const normY = pad +
            ((100 - normalize(y, computedYRange[0], computedYRange[1])) *
                usableHeight) /
                100;
        const urgency = Math.round(10 * normalize(x, computedXRange[0], computedXRange[1])) / 10;
        const importance = Math.round(10 * normalize(y, computedYRange[0], computedYRange[1])) / 10;
        return { normX, normY, urgency, importance };
    };
    return (_jsx(View, { children: _jsxs(Svg, { width: chartWidth, height: chartHeight, children: [_jsx(Line, { x1: chartWidth / 2, y1: padding, x2: chartWidth / 2, y2: chartHeight - padding, stroke: "#aaa" }), _jsx(Line, { x1: padding, y1: chartHeight / 2, x2: chartWidth - padding, y2: chartHeight / 2, stroke: "#aaa" }), items.map((point, i) => {
                    const values = getNormValues(point);
                    return (_createElement(Point, { ...values, key: i, modalContent: _jsx(Text, { children: label.map((s) => String(point[s])).join(" - ") }) }));
                })] }) }));
};
