import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Drawer.tsx
import React, { useRef } from "react";
import { Animated, Dimensions, ImageBackground, PanResponder, Pressable, StyleSheet, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const SCREEN_WIDTH = Dimensions.get("window").width;
const DRAWER_WIDTH = 250;
export default function MyDrawer({ children, icon, isOpen, onClose, }) {
    const translateX = useRef(new Animated.Value(isOpen ? 0 : -DRAWER_WIDTH)).current;
    const panResponder = useRef(PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) => gesture.dx > 10,
        onPanResponderMove: (_, gesture) => {
            if (gesture.dx > -DRAWER_WIDTH && gesture.dx < 0) {
                translateX.setValue(gesture.dx);
            }
        },
        onPanResponderRelease: (_, gesture) => {
            if (gesture.dx < -50) {
                Animated.timing(translateX, {
                    toValue: -DRAWER_WIDTH,
                    duration: 200,
                    useNativeDriver: true,
                }).start(() => onClose());
            }
            else {
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }).start();
            }
        },
    })).current;
    React.useEffect(() => {
        Animated.timing(translateX, {
            toValue: isOpen ? 0 : -DRAWER_WIDTH,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [isOpen]);
    return (_jsxs(View, { style: StyleSheet.absoluteFill, pointerEvents: isOpen ? "auto" : "none", children: [isOpen && _jsx(Pressable, { onPress: onClose, style: styles.backdrop }), _jsx(Animated.View, { style: [styles.drawer, { transform: [{ translateX }] }], ...panResponder.panHandlers, children: _jsx(ImageBackground, { source: require("../../assets/faintgreen.jpg"), style: styles.background, resizeMode: "cover", children: _jsx(SafeAreaView, { children: children }) }) }), _jsx(View, { style: styles.content, children: icon })] }));
}
const styles = StyleSheet.create({
    drawer: {
        position: "absolute",
        width: DRAWER_WIDTH,
        height: "100%",
        backgroundColor: "#fff",
        zIndex: 2,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 2,
    },
    content: {
        flex: 1,
        zIndex: 1,
    },
    background: {
        flex: 1,
    },
});
