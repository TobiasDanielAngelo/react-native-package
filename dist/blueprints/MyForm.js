import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { useVisible } from "../constants/hooks";
import { MyButton, MyCheckBox, MyConfirmModal, MyDateTimePicker, MyDropdownSelector, MyFileUploader, MyImageUploader, MyInput, MyMultiDropdownSelector, MyTextArea, } from "./";
import { MyIcon } from "./MyIcon";
import { Text, View } from "react-native";
const getMsg = (msg, name) => msg && !`${msg[name]}`.includes("undefined")
    ? `${msg[name]}`.includes("Invalid pk")
        ? "Select one that applies"
        : `${msg[name]}`
    : "";
const renderField = (t, details, onChangeValue, msg, key) => {
    const commonProps = {
        label: t.label,
        value: details[t.name],
        onChangeValue: (u) => onChangeValue(u, t.name),
        msg: getMsg(msg, t.name),
    };
    switch (t.type) {
        case "function":
            return (_jsxs(View, { children: [_jsx(Text, { children: t.label }), _jsx(Text, { style: { textAlign: "center" }, children: t.function?.(details) })] }, key));
        case "password":
            return _jsx(MyInput, { ...commonProps, isPassword: true }, key);
        case "select":
            return (_jsx(MyDropdownSelector, { ...commonProps, options: t.options }, key));
        case "date":
        case "time":
        case "datetime":
            return (_createElement(MyDateTimePicker, { ...commonProps, key: key, isDateOnly: t.type === "date", isTimeOnly: t.type === "time" }));
        case "multi":
            return (_jsx(MyMultiDropdownSelector, { ...commonProps, value: details[t.name] ?? [], options: t.options }, key));
        case "textarea":
            return (_jsx(MyTextArea, { ...commonProps, value: details[t.name] ?? "", centered: t.centered }, key));
        case "color":
            return _jsx(MyInput, { ...commonProps }, key);
        case "check":
            return _jsx(MyCheckBox, { ...commonProps }, key);
        case "image":
            return (_jsx(MyImageUploader, { value: details[t.name], onChangeValue: (u) => onChangeValue(u, t.name) }, key));
        case "file":
            return (_jsx(MyFileUploader, { value: details[t.name], onChangeValue: (u) => onChangeValue(u, t.name) }, key));
        case "number":
        case "text":
            return (_jsx(MyInput, { ...commonProps, value: details[t.name] ?? "", centered: t.centered }, key));
        default:
            return (_jsx(Text, { style: { textAlign: "center" }, children: t.label }, key));
    }
};
export const MyForm = observer(({ fields, title, objectName, details, setDetails, onPressSubmit, onPressSubmitAdd, hasDelete, onDelete, msg, isLoading, }) => {
    const { isVisible1, setVisible1 } = useVisible();
    const onChangeValue = (val, name) => setDetails({ ...details, [name]: val });
    const onPressDelete = () => {
        setVisible1?.(true);
    };
    const onPressConfirm = async () => {
        await onDelete?.();
    };
    return (_jsxs(View, { children: [_jsx(MyConfirmModal, { isVisible: isVisible1, setVisible: setVisible1, onPressCheck: onPressConfirm, objectName: objectName, actionName: "Delete" }), _jsx(Text, { style: {
                    width: 300,
                    borderBottomWidth: 1,
                    borderBottomColor: "#dddddd",
                }, children: title }), fields.map((row, rowIdx) => (_jsx(View, { children: row.map((t, colIdx) => t ? (renderField(t, details, onChangeValue, msg, colIdx)) : (_jsx(View, {}, colIdx))) }, rowIdx))), _jsx(Text, { style: { color: "darkred" }, children: getMsg(msg, "nonFieldErrors") }), _jsx(Text, { style: { color: "red" }, children: getMsg(msg, "detail") }), _jsxs(View, { style: {
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                }, children: [_jsx(MyButton, { onPress: onPressSubmit, isLoading: isLoading, label: "Save" }), !hasDelete ? (_jsx(MyButton, { onPress: onPressSubmitAdd, isLoading: isLoading, label: "Save and Add" })) : (_jsx(MyIcon, { icon: "trash", onPress: onPressDelete }))] })] }));
});
