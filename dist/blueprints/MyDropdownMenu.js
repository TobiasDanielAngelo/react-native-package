import { jsx as _jsx } from "react/jsx-runtime";
import { FlatList, Pressable, View, Text, StyleSheet, } from "react-native";
export const MyDropdownMenu = (props) => {
    const { open, setOpen, actions, margin } = props;
    if (!open)
        return null;
    return (_jsx(View, { style: [
            styles.dropdown,
            {
                marginLeft: -(margin ?? 0) * 16,
                marginRight: -(margin ?? 0) * 16,
            },
        ], children: _jsx(FlatList, { data: actions, keyExtractor: (_, i) => i.toString(), contentContainerStyle: styles.list, keyboardShouldPersistTaps: "handled", renderItem: ({ item }) => {
                const onPress = () => {
                    item.onPress?.();
                    setOpen?.(false);
                };
                return (_jsx(Pressable, { onPress: onPress, children: _jsx(Text, { style: styles.item, onPress: onPress, children: item.title }) }));
            } }) }));
};
const styles = StyleSheet.create({
    dropdown: {
        position: "absolute",
        top: 25,
        zIndex: 10,
        // maxHeight: "400%",
        overflow: "scroll",
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        width: 176, // w-44
    },
    list: {
        paddingVertical: 8,
    },
    item: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 14,
        color: "#374151",
    },
});
