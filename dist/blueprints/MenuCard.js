import { jsx as _jsx } from "react/jsx-runtime";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MyIcon } from "./MyIcon";
export const MenuCard = (props) => {
    const { name, label, selected, onPress } = props;
    return (_jsx(TouchableOpacity, { style: [
            styles.main,
            {
                backgroundColor: selected ? "lightseagreen" : "teal",
            },
        ], onPress: onPress, children: _jsx(MyIcon, { icon: name, label: label, onPress: onPress, color: "white", size: 15 }) }));
};
const styles = StyleSheet.create({
    main: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        padding: 10,
    },
    text: { color: "white" },
});
