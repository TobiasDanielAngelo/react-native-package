import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { MyCheckBox } from "./MyCheckbox";
import { MyIcon } from "./MyIcon";
import { MyInput } from "./MyInput";
export const MyDropdownSelector = (props) => {
    const { label, options = [], onChangeValue, value, msg, noSearch, flex, } = props;
    const [isOpen, setOpen] = useState(false);
    const [isOption, setIsOption] = useState(true);
    const [search, setSearch] = useState("");
    const filteredOptions = options?.filter((opt) => String(opt.name).toLowerCase().includes(search.toLowerCase()));
    const toggleValue = (t) => {
        onChangeValue(t === value ? null : t);
        setOpen(false);
        setSearch("");
        setIsOption(true);
    };
    return (_jsxs(View, { style: { paddingHorizontal: 2 }, children: [label && (_jsx(Text, { style: { fontSize: 15, color: "blue", marginBottom: 5 }, children: label })), isOption ? (_jsxs(View, { style: { flexDirection: "row", gap: 10, flex: flex }, children: [_jsxs(Pressable, { style: {
                            borderWidth: 1,
                            borderColor: "gray",
                            borderRadius: 5,
                            justifyContent: "space-between",
                            paddingHorizontal: 10,
                            alignItems: "center",
                            flexDirection: "row",
                            flex: 1,
                            backgroundColor: "white",
                        }, onPress: () => setOpen(!isOpen), children: [_jsx(Text, { ellipsizeMode: "tail", children: options.find((s) => s.id === value)
                                    ? options.find((s) => s.id === value)?.name
                                    : "No item selected." }), _jsx(MyIcon, { icon: isOpen ? "angle-up" : "angle-down", onPress: () => setOpen(!isOpen) })] }), !noSearch && (_jsx(MyIcon, { icon: "searchengin", onPress: () => setIsOption(false) }))] })) : (_jsxs(View, { style: { flexDirection: "row", gap: 10 }, children: [_jsx(View, { style: { flex: 1 }, children: _jsx(MyInput, { value: search, onChangeValue: setSearch, placeholder: "Search" }) }), !noSearch && (_jsx(MyIcon, { icon: "searchengin", onPress: () => setIsOption(true) }))] })), (isOpen || search) && (_jsx(View, { style: {
                    marginTop: 5,
                    padding: 5,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "gray",
                    backgroundColor: "white",
                }, children: _jsx(FlatList, { data: filteredOptions, keyExtractor: (_, i) => i.toString(), keyboardShouldPersistTaps: "handled", renderItem: ({ item: opt }) => (_jsxs(View, { style: {
                            alignItems: "center",
                            flexDirection: "row",
                        }, children: [_jsx(MyCheckBox, { value: value === opt.id, onChangeValue: () => toggleValue(opt.id) }), _jsx(Text, { onPress: () => toggleValue(opt.id), children: opt.name })] }, opt.id)) }) })), _jsx(Text, { style: { color: "darkred" }, children: msg })] }));
};
