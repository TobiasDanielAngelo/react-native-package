import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text, View } from "react-native";
import { MyIcon } from "./MyIcon";
import { MyModal } from "./MyModal";
export const MyConfirmModal = (props) => {
    const { isVisible, setVisible, onPressCheck, objectName, actionName, msg, isLoading, } = props;
    return (_jsxs(MyModal, { isVisible: isVisible, setVisible: setVisible, title: "Confirm Action", disableClose: true, children: [_jsx(View, { style: { height: 200, justifyContent: "center", alignItems: "center" }, children: _jsx(Text, { children: objectName
                        ? `${actionName ?? "Confirm"} this ${objectName}?`
                        : `${actionName ?? "Confirm"} this item?` }) }), _jsx(View, { children: msg &&
                    !`${msg["nonFieldErrors"]}`.includes("undefined")
                    ? `${msg["nonFieldErrors"]}`
                    : "" }), _jsx(View, { children: msg && !`${msg["detail"]}`.includes("undefined")
                    ? `${msg["detail"]}`
                    : "" }), _jsx(View, { style: { alignItems: "flex-end" }, children: _jsx(MyIcon, { icon: "check", onPress: onPressCheck }) })] }));
};
