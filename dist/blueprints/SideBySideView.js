import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FlatList, useWindowDimensions, View, } from "react-native";
export const SideBySideView = ({ SideA, SideB, ratio = 1, reversed = false, }) => {
    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width || (height < width && height < 600);
    const total = ratio + 1;
    const widthA = `${(ratio / total) * 100}%`;
    const widthB = `${(1 / total) * 100}%`;
    const orderedItems = reversed && isPortrait
        ? [
            { key: "B", content: SideB },
            { key: "A", content: SideA },
        ]
        : [
            { key: "A", content: SideA },
            { key: "B", content: SideB },
        ];
    if (isPortrait) {
        return (_jsx(FlatList, { keyboardShouldPersistTaps: "handled", data: orderedItems, keyExtractor: (item) => item.key, renderItem: ({ item }) => (_jsx(View, { style: { paddingVertical: 8 }, children: item.content })) }));
    }
    // Landscape: side-by-side with width control
    return (_jsxs(View, { style: {
            flexDirection: "row",
            flex: 1,
            paddingTop: 10,
            paddingHorizontal: 10,
        }, children: [_jsx(View, { style: { width: widthA }, children: SideA }), _jsx(View, { style: { width: widthB }, children: SideB })] }));
};
