import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import moment from "moment";
import { StyleSheet, Text, View } from "react-native";
import { useVisible } from "../constants/hooks";
import { DatePicker } from "./DatePicker";
import { DateTimePicker } from "./DateTimePicker";
import { MyIcon } from "./MyIcon";
import { TimePicker } from "./TimePicker";
const toString = (dt, isDateOnly, isTimeOnly) => {
    return isDateOnly
        ? moment(dt).format("MMM D, YYYY")
        : isTimeOnly
            ? moment(dt).format("h:mm A")
            : moment(dt).format("MMM D YYYY h:mm A");
};
export const MyDateTimePicker = (props) => {
    const { hidden, onChangeValue, value, isDateOnly, isTimeOnly, label } = props;
    const { isVisible1, setVisible1 } = useVisible();
    const valueMoment = value !== "" && value
        ? isDateOnly
            ? moment(value, "MMM D, YYYY")
            : isTimeOnly
                ? moment(value, "h:mm A")
                : moment(value, "MMM D YYYY h:mm A")
        : undefined;
    const dateString = valueMoment ? valueMoment.format("MMM D, YYYY") : "N/D";
    const timeString = valueMoment ? valueMoment.format("h:mm A") : "N/T";
    const calendarLabel = isDateOnly
        ? dateString
        : isTimeOnly
            ? timeString
            : `${dateString} ${timeString}`;
    return (!hidden && (_jsxs(View, { style: styles.main, children: [_jsxs(View, { style: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                }, children: [_jsxs(View, { style: { flexDirection: "row", alignItems: "center" }, children: [_jsx(MyIcon, { icon: "times", size: 10, onPress: () => onChangeValue("") }), _jsx(Text, { style: { paddingLeft: 5 }, children: label })] }), _jsx(View, { children: _jsx(MyIcon, { icon: "calendar", size: 10, onPress: () => onChangeValue(toString(new Date(), isDateOnly, isTimeOnly)), label: "Now" }) })] }), _jsx(MyIcon, { icon: "calendar", onPress: () => setVisible1(true), label: calendarLabel }), isDateOnly ? (_jsx(DatePicker, { date: value, setDate: onChangeValue, open: isVisible1, setOpen: setVisible1 })) : isTimeOnly ? (_jsx(TimePicker, { time: value, setTime: onChangeValue, open: isVisible1, setOpen: setVisible1 })) : (_jsx(DateTimePicker, { dateTime: value, setDateTime: onChangeValue, open: isVisible1, setOpen: setVisible1 }))] })));
};
const styles = StyleSheet.create({
    main: {
        margin: 5,
    },
    text: {
        color: "teal",
        marginHorizontal: 5,
    },
    bar: {
        flexDirection: "row",
    },
});
