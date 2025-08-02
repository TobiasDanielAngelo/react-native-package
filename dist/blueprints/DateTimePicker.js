import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MyCalendar } from "./MyCalendar";
import { MyIcon } from "./MyIcon";
import { MyModal } from "./MyModal";
import { MyInput } from "./MyInput";
import moment from "moment";
export const DateTimePicker = ({ dateTime, setDateTime, open, setOpen, }) => {
    const [hour, setHour] = useState(moment(dateTime ?? new Date(), "MMM D YYYY h:mm A").format("hh"));
    const [minute, setMinute] = useState(moment(dateTime ?? new Date(), "MMM D YYYY h:mm A").format("mm"));
    const [isAM, setIsAM] = useState(moment(dateTime ?? new Date(), "MMM D YYYY h:mm A").format("A") === "AM");
    const [value, setValue] = useState(moment(dateTime, "MMM D, YYYY").toDate());
    const onPressCheck = () => {
        const datePart = moment(value).format("YYYY-MM-DD");
        const timeString = `${hour}:${minute} ${isAM ? "AM" : "PM"}`;
        const fullDateTime = moment(`${datePart} ${timeString}`, "YYYY-MM-DD hh:mm A").format("MMM D YYYY h:mm A");
        setDateTime(fullDateTime);
        setOpen(false);
    };
    const correctorHour = (t) => {
        return String(isNaN(parseInt(t)) ? 1 : Math.max(1, Math.min(parseInt(t), 12))).padStart(2, "0");
    };
    const correctorMinute = (t) => {
        return String(isNaN(parseInt(t)) ? 0 : Math.max(0, Math.min(parseInt(t), 59))).padStart(2, "0");
    };
    return (_jsxs(MyModal, { isVisible: open, setVisible: setOpen, children: [_jsx(MyCalendar, { date: value, setDate: setValue, noModal: true }), _jsxs(View, { style: styles.container, children: [_jsx(MyInput, { value: hour, onChangeValue: setHour, corrector: correctorHour, flex: 1, centered: true, numeric: true }), _jsx(MyInput, { value: minute, onChangeValue: setMinute, corrector: correctorMinute, flex: 1, centered: true, numeric: true }), _jsxs(Pressable, { style: {
                            alignItems: "center",
                            flexDirection: "row",
                            gap: 3,
                        }, onPress: () => setIsAM((t) => !t), children: [_jsx(Text, { onPress: () => setIsAM((t) => !t), children: isAM ? "AM" : "PM" }), _jsx(MyIcon, { icon: isAM ? "sun" : "moon", size: 10, onPress: () => setIsAM((t) => !t) })] })] }), _jsx(View, { style: {
                    flexDirection: "row",
                    justifyContent: "flex-end",
                }, children: _jsx(MyIcon, { icon: "check", onPress: onPressCheck }) })] }));
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: 120,
        margin: "auto",
    },
});
