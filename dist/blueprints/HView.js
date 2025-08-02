import { jsx as _jsx } from "react/jsx-runtime";
import { StyleSheet, View } from "react-native";
export const HView = (props) => {
    const { hidden, children } = props;
    return !hidden && _jsx(View, { style: styles.main, children: children });
};
const styles = StyleSheet.create({
    main: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
