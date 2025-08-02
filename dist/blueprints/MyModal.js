import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FlatList, StyleSheet, Text, View, } from "react-native";
import { Overlay } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { HView } from "./HView";
import { MyIcon } from "./MyIcon";
export const MyModal = (props) => {
    const { isVisible, setVisible, children, title, subTitle } = props;
    return (_jsx(Overlay, { isVisible: isVisible, statusBarTranslucent: true, navigationBarTranslucent: true, onBackdropPress: () => setVisible(false), supportedOrientations: ["portrait", "landscape"], children: _jsxs(SafeAreaView, { style: styles.safeAreaContainer, children: [_jsxs(HView, { children: [_jsx(Text, { style: styles.text, children: title }), _jsx(Text, { style: styles.text, children: subTitle }), _jsx(MyIcon, { icon: "times", onPress: () => setVisible(false) })] }), _jsx(FlatList, { data: [1], renderItem: () => _jsx(View, { style: styles.children, children: children }), keyboardShouldPersistTaps: "handled" })] }) }));
};
const styles = StyleSheet.create({
    text: {},
    bar: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
    },
    children: {},
    safeAreaContainer: {
        width: 300,
        maxHeight: "100%",
    },
});
