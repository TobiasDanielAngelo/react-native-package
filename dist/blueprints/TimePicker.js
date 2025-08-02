import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import moment from "moment";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MyIcon } from "./MyIcon";
import { MyInput } from "./MyInput";
import { MyModal } from "./MyModal";
export const TimePicker = ({ time, setTime, open, setOpen, }) => {
    const [hour, setHour] = useState(moment(time).format("hh"));
    const [minute, setMinute] = useState(moment(time).format("mm"));
    const [isAM, setIsAM] = useState(moment(time).format("A") === "AM");
    const onPressCheck = () => {
        setTime(`${hour}:${minute} ${isAM ? "AM" : "PM"}`);
        setOpen(false);
    };
    const correctorHour = (t) => {
        return String(isNaN(parseInt(t)) ? 1 : Math.max(1, Math.min(parseInt(t), 12))).padStart(2, "0");
    };
    const correctorMinute = (t) => {
        return String(isNaN(parseInt(t)) ? 0 : Math.max(0, Math.min(parseInt(t), 59))).padStart(2, "0");
    };
    return (_jsxs(MyModal, { isVisible: open, setVisible: setOpen, children: [_jsxs(View, { style: styles.container, children: [_jsx(MyInput, { value: hour, onChangeValue: setHour, corrector: correctorHour, flex: 1, centered: true, numeric: true }), _jsx(MyInput, { value: minute, onChangeValue: setMinute, corrector: correctorMinute, flex: 1, centered: true, numeric: true }), _jsxs(Pressable, { style: {
                            alignItems: "center",
                            flexDirection: "row",
                            gap: 3,
                        }, onPress: () => setIsAM((t) => !t), children: [_jsx(Text, { onPress: () => setIsAM((t) => !t), children: isAM ? "AM" : "PM" }), _jsx(MyIcon, { icon: isAM ? "sun" : "moon", size: 10, onPress: () => setIsAM((t) => !t) })] })] }), _jsx(View, { style: { flex: 1, alignItems: "flex-end" }, children: _jsx(MyIcon, { icon: "check", onPress: onPressCheck }) })] }));
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: 120,
        height: 120,
        alignItems: "center",
        margin: "auto",
    },
});
