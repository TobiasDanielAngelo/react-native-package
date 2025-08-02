import { jsx as _jsx } from "react/jsx-runtime";
import { StyleSheet, View } from "react-native";
import { MyIcon } from "./MyIcon";
export const MyCheckBox = (props) => {
    const { hidden, value, onChangeValue, label } = props;
    return (!hidden && (_jsx(View, { style: styles.main, children: _jsx(MyIcon, { icon: value ? "check" : "square", onPress: () => onChangeValue?.(!value), label: label }) })));
};
const styles = StyleSheet.create({
    checkbox: {
        alignSelf: "center",
    },
    main: {
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
    },
});
