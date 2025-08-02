import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
// 1. Map icons to names
const iconMap = {};
export const MyIcon = ({ icon, label, hidden, disabled, onPress, onLongPress, color, size, }) => {
    return (!hidden && (_jsxs(TouchableOpacity, { style: styles.main, onPress: !disabled ? onPress : undefined, onLongPress: !disabled ? onLongPress : undefined, children: [_jsx(Icon, { name: icon, color: color ?? undefined, type: "font-awesome-5", size: size }), label && (_jsx(Text, { style: [styles.text, { color: color ?? undefined, fontSize: size }], children: label }))] })));
};
const styles = StyleSheet.create({
    main: {
        alignItems: "center",
    },
    text: {
        color: "teal",
    },
});
