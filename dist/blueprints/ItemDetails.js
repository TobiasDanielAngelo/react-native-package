import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { Text, View, StyleSheet } from "react-native";
import { toRomanWithExponents, toTitleCase } from "../constants/helpers";
import { formatValue } from "../constants/JSXHelpers";
import { isWideScreen } from "../constants/constants";
const secStyles = StyleSheet.create({
    header: {
        fontSize: 14,
        flexDirection: "row",
    },
    important: {
        fontSize: 30,
        fontWeight: "bold",
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    body: {
        fontSize: 18,
        paddingHorizontal: 28,
    },
});
const sectionStyles = {
    Header: secStyles.header,
    Important: secStyles.important,
    Body: secStyles.body,
};
export const ItemDetails = observer(({ item, shownFields = [], header = [], important = [], prices = [], showMore, itemMap = [], }) => {
    const itemView = item.$view ?? item;
    const allItemKeys = [
        ...new Set(Object.keys(itemView).filter((s) => !s.includes("$"))),
    ];
    const sections = [
        { title: "Header", keys: header },
        { title: "Important", keys: important },
        {
            title: "Body",
            keys: allItemKeys.filter((key) => !header.includes(key) && !important.includes(key)),
        },
    ];
    const renderRow = (key, title) => {
        const value = item[key];
        const kv = itemMap?.find((s) => s.key === key);
        const keyTitle = key === "id" ? "ID" : toTitleCase(key);
        const body = key === "id"
            ? toRomanWithExponents(value)
            : formatValue(value, String(key), prices, kv);
        if (body === "—")
            return _jsx(View, {}, String(key));
        return (_jsxs(View, { style: styles.container, children: [title === "Body" && _jsx(Text, { style: styles.keyTitle, children: keyTitle }), _jsx(Text, { style: [styles.body, sectionStyles[title]], children: body })] }, String(key)));
    };
    return (_jsx(_Fragment, { children: sections.map(({ title, keys }) => (_jsx(View, { style: sectionStyles[title] || {}, children: keys
                // .filter((key) => shownFields.includes(key) || showMore)
                .map((key) => renderRow(key, title)) }, title))) }));
});
const styles = StyleSheet.create({
    container: {
        flexDirection: isWideScreen ? "row" : "column",
    },
    keyTitle: {
        fontSize: 12,
        fontWeight: "bold",
    },
    body: {
        paddingLeft: 12,
        flexWrap: "wrap",
    },
});
