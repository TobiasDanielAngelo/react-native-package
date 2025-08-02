import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { SpeedDial } from "react-native-elements";
import { StyleSheet } from "react-native";
export const MySpeedDial = (props) => {
    const { actions, leftSide } = props;
    const [open, setOpen] = useState(false);
    return (_jsx(SpeedDial, { isOpen: open, icon: {
            name: leftSide ? "sliders-h" : "pen",
            color: "#fff",
            size: 20,
            type: "font-awesome-5",
        }, openIcon: { name: "close", color: "#fff" }, onOpen: () => setOpen(!open), onClose: () => setOpen(!open), placement: leftSide ? "left" : "right", color: "teal", buttonStyle: {
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
        }, containerStyle: {
            bottom: -10,
            right: leftSide ? 10 : -10,
        }, children: actions?.map((s, ind) => (_jsx(SpeedDial.Action, { icon: { name: s.icon, color: "#fff", type: "font-awesome-5" }, title: s.name, onPress: s.onPress, style: { top: -50, right: -20 }, titleStyle: { top: -50, right: -20 }, color: "teal", buttonStyle: {
                borderRadius: 100,
            } }, ind))) }));
};
const styles = StyleSheet.create({});
