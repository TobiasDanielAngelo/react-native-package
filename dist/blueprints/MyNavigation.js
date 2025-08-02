import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { FlatList, Text, View } from "react-native";
import { useNavigate } from "react-router-native";
import MyDrawer from "./MyDrawer";
import { MyImage } from "./MyImages";
import { titleToCamel, toTitleCase } from "../constants/helpers";
const drawerWidth = 240;
export const ResponsiveDrawer = observer((props) => {
    const { open, setOpen, paths, useStore } = props;
    const navigate = useNavigate();
    return (_jsx(MyDrawer, { isOpen: open, onClose: () => setOpen?.(false), children: _jsx(FlatList, { keyboardShouldPersistTaps: "handled", data: paths, keyExtractor: (_, i) => i.toString(), renderItem: ({ item: s }) => {
                const onPress = () => {
                    if (s.onPress) {
                        s.onPress();
                    }
                    else {
                        navigate(s.link ?? "#");
                    }
                    setOpen?.(false);
                };
                return (_jsxs(View, { style: {
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 10,
                    }, children: [_jsx(MyImage, { image: titleToCamel(s.title), onPress: onPress }), _jsx(Text, { numberOfLines: 2, adjustsFontSizeToFit: true, style: {
                                fontSize: 18,
                                marginHorizontal: 5,
                                flexShrink: 1,
                                fontWeight: "bold",
                            }, onPress: onPress, children: toTitleCase(s.title) })] }));
            } }) }));
});
export const MyNavBar = observer((props) => {
    const { useStore, paths, drawerOpen, setDrawerOpen } = props;
    const { userStore } = useStore();
    const navigate = useNavigate();
    const onPressLogout = async () => {
        userStore.logoutUser();
        navigate("/login");
    };
    const leafPages = paths?.flatMap((p) => {
        const leaves = p.children?.length
            ? p.children.filter((c) => !c.children?.length)
            : [];
        if (p.link) {
            leaves.push({
                title: p.title,
                link: p.link,
            });
        }
        return leaves.length ? leaves : [p];
    });
    const onPress = () => {
        setDrawerOpen(true);
    };
    return (_jsx(ResponsiveDrawer, { useStore: useStore, open: drawerOpen, setOpen: setDrawerOpen, paths: [
            ...(leafPages ?? []),
            {
                title: "Logout",
                link: "",
                onPress: onPressLogout,
            },
        ], onPress: onPress }));
});
