import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { MyIcon } from "./MyIcon";
export const MyInput = (props) => {
    const { hidden, label, value, onChangeValue, corrector, isPassword, 
    // optional,
    msg, placeholder, checkpoint, checkAction, disabled, flex, numeric, centered, maxLength, autoCapitalize, enlarged, multiline, } = props;
    const [editable, setEditable] = useState(true);
    const onChangeCorrect = (t) => {
        let newVal = corrector ? corrector(t) : t;
        onChangeValue?.(newVal);
    };
    const onCheck = useCallback(async () => {
        if (checkAction)
            await checkAction();
        setEditable(false);
    }, []);
    const onEdit = useCallback(() => {
        setEditable(true);
    }, []);
    return (!hidden && (_jsxs(View, { style: [styles.main, { flex: flex ? flex : 0 }], children: [_jsxs(View, { style: styles.textInput, children: [label && _jsx(Text, { children: label }), _jsx(TextInput, { onChangeText: onChangeCorrect, value: String(value), style: [
                            styles.input,
                            {
                                backgroundColor: editable && !disabled ? "white" : "#ddd",
                                textAlign: centered ? "center" : numeric ? "right" : "left",
                                borderRadius: 5,
                            },
                        ], editable: editable && !disabled, placeholder: placeholder ?? label, keyboardType: numeric ? "numeric" : "default", maxLength: maxLength, autoCapitalize: autoCapitalize ? "characters" : undefined, secureTextEntry: isPassword, multiline: multiline }), msg && _jsx(Text, { style: { color: "darkred" }, children: msg })] }), checkpoint && (_jsx(MyIcon, { icon: !editable ? "edit" : "check", onPress: !editable ? onEdit : onCheck }))] })));
};
const styles = StyleSheet.create({
    main: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 3,
    },
    textInput: {
        padding: 3,
        flex: 1,
    },
});
