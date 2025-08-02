import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { MyCheckBox } from "./MyCheckbox";
import { MyIcon } from "./MyIcon";
export const MyMultiDropdownSelector = (props) => {
    const { label, options = [], onChangeValue, value = [], msg, relative, open, maxSelections, isAll, } = props;
    const [isOpen, setOpen] = useState(open ?? false);
    const [selectAll, setSelectAll] = useState(isAll);
    const onToggle = (id) => {
        if (value.includes(id)) {
            onChangeValue(value.filter((v) => v !== id));
        }
        else {
            if (!maxSelections || value.length < maxSelections) {
                onChangeValue([...value, id]);
            }
        }
    };
    useEffect(() => {
        onChangeValue(selectAll ? options.map((s) => s.id) : []);
    }, [selectAll, options.length]);
    useEffect(() => {
        onChangeValue(selectAll ? options.map((s) => s.id) : value === null ? [] : value);
    }, []);
    return (_jsxs(View, { style: { position: "relative", paddingHorizontal: 2 }, children: [label && (_jsx(Text, { style: { fontSize: 15, color: "blue", marginBottom: 5 }, children: label })), _jsxs(Pressable, { style: {
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    borderColor: "gray",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                }, onPress: () => setOpen(!isOpen), children: [_jsx(Text, { children: !value || value.length === 0
                            ? `Select ${label ?? "items"}`
                            : value.slice(0, 3).join(", ") + (value.length > 3 ? "..." : "") }), _jsx(MyIcon, { icon: isOpen ? "angle-up" : "angle-down", onPress: () => setOpen(!isOpen) })] }), isOpen && (_jsxs(View, { style: {
                    marginTop: 5,
                    padding: 5,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "gray",
                    backgroundColor: "whtie",
                }, children: [_jsxs(View, { style: {
                            flexDirection: "row",
                            alignItems: "center",
                        }, children: [_jsx(MyCheckBox, { value: selectAll, onChangeValue: () => setSelectAll((t) => !t) }), _jsx(Text, { children: "Select All" })] }), _jsx(FlatList, { data: options, keyExtractor: (_, i) => i.toString(), keyboardShouldPersistTaps: "handled", renderItem: ({ item: opt }) => (_jsxs(View, { style: {
                                alignItems: "center",
                                flexDirection: "row",
                            }, children: [_jsx(MyCheckBox, { value: value.includes(opt.id), onChangeValue: () => onToggle(opt.id) }), _jsx(Text, { children: opt.name })] })) })] })), _jsx(Text, { style: { color: "darkred" }, children: msg })] }));
};
