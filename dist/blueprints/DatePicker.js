import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import moment from "moment";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { MyCalendar } from "./MyCalendar";
import { MyIcon } from "./MyIcon";
import { MyModal } from "./MyModal";
export const DatePicker = ({ date, setDate, open, setOpen, }) => {
    const [value, setValue] = useState(moment(date, "MMM D, YYYY").toDate());
    const onPressCheck = () => {
        setDate(moment(value).format("MMM D, YYYY"));
        setOpen(false);
    };
    return (_jsxs(MyModal, { isVisible: open, setVisible: setOpen, children: [_jsx(MyCalendar, { date: value, setDate: setValue, noModal: true }), _jsx(View, { style: { flex: 1, alignItems: "flex-end" }, children: _jsx(MyIcon, { icon: "check", onPress: onPressCheck }) })] }));
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: 120,
        margin: "auto",
    },
});
