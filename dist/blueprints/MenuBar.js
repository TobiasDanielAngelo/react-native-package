import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { StyleSheet, View } from "react-native";
import { MenuCard } from "./MenuCard";
export const MenuBar = (props) => {
    const { items, hidden } = props;
    return (!hidden && (_jsx(View, { style: styles.main, children: items.map((s, ind) => (_createElement(MenuCard, { ...s, key: ind }))) })));
};
const styles = StyleSheet.create({
    main: {
        minHeight: 20,
        maxHeight: "15%",
        backgroundColor: "gainsboro",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
});
