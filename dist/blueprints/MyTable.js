import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
function getDimensions(matrix) {
    const colCount = matrix[0]?.length || 0;
    const rowCount = matrix.length;
    const width = Array(colCount).fill(0);
    const height = Array(rowCount).fill(0);
    for (let row = 0; row < rowCount; row++) {
        let maxLines = 1;
        for (let col = 0; col < colCount; col++) {
            const cell = matrix[row][col] ?? "";
            if (typeof cell === "string") {
                const lines = cell.split("\n");
                const maxLen = Math.max(...lines.map((l) => l.length));
                width[col] = Math.max(width[col], Math.max(maxLen * 8 + 16, 100)); // estimate width
                maxLines = Math.max(maxLines, lines.length);
            }
        }
        height[row] = Math.max(maxLines * 20, 40); // estimate height
    }
    return { width, height };
}
export const MyTable = (props) => {
    const { matrix, hidden } = props;
    const { width: colWidths, height: rowHeights } = getDimensions(matrix);
    return hidden ? (_jsx(_Fragment, {})) : matrix.length < 2 ? (_jsx(Text, { style: { textAlign: "center", paddingTop: 10 }, children: "No entries." })) : (_jsx(ScrollView, { style: styles.container, horizontal: true, keyboardShouldPersistTaps: "handled", children: _jsxs(View, { children: [_jsx(View, { style: {
                        height: rowHeights[0],
                        flexDirection: "row",
                    }, children: matrix[0].map((s, ind) => (_jsx(View, { style: {
                            width: colWidths[ind],
                            alignItems: "center",
                            justifyContent: "center",
                        }, children: _jsx(Text, { style: { textAlign: "center" }, children: s }) }, ind))) }), _jsx(FlatList, { keyboardShouldPersistTaps: "handled", data: matrix.slice(1), keyExtractor: (_, i) => i.toString(), renderItem: ({ item: s, index: i }) => (_jsxs(View, { style: {
                            height: rowHeights[i + 1],
                            flexDirection: "row",
                            backgroundColor: i % 2 ? undefined : "rgba(255,255,255,0.2)",
                        }, children: [_jsx(Text, { style: {
                                    width: colWidths[0],
                                    justifyContent: "center",
                                    padding: 10,
                                }, children: s[0] }), s.slice(1).map((t, ind) => (_jsx(View, { style: {
                                    width: colWidths[ind + 1],
                                    backgroundColor: ind % 2 ? undefined : "rgba(20,20,20,0.1)",
                                    justifyContent: "center",
                                    padding: 10,
                                }, children: _jsx(Text, { children: t }) }, ind)))] })) })] }) }));
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        margin: "auto",
    },
    // row: { height: 40 },
});
