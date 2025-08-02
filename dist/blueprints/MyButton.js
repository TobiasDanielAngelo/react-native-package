import { jsx as _jsx } from "react/jsx-runtime";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
export const MyButton = (props) => {
    const { hidden, onPress, label, flex } = props;
    return (!hidden && (_jsx(TouchableOpacity, { style: [styles.main], onPress: onPress, children: _jsx(Text, { style: styles.text, children: label }) })));
};
const styles = StyleSheet.create({
    main: {
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: "teal",
        borderRadius: 30,
        paddingHorizontal: 10,
    },
    text: { textAlign: "center", color: "white", fontSize: 20 },
});
