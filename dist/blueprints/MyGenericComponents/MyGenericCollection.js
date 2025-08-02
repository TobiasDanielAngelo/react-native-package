import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { sortAndFilterByIds } from "../../constants/helpers";
import { useVisible } from "../../constants/hooks";
import { MyIcon } from "../MyIcon";
const TopBar = () => (_jsx(View, { style: styles2.topBar, children: _jsx(Text, { style: styles2.barText, children: "TopBar" }) }));
const styles2 = StyleSheet.create({
    topBar: {
        height: 50,
        backgroundColor: "#4A90E2",
        justifyContent: "center",
        alignItems: "center",
    },
    bottomBar: {
        height: 60,
        backgroundColor: "#50E3C2",
        justifyContent: "center",
        alignItems: "center",
    },
    barText: {
        color: "#fff",
        fontWeight: "bold",
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
});
export const MyGenericCollection = observer((props) => {
    const { PageBar, items, pageDetails, CardComponent, title } = props;
    const { isVisible1, setVisible1 } = useVisible();
    // useEffect(() => {
    //   setVisible1(true);
    // }, []);
    return (_jsxs(View, { style: { flex: 1 }, children: [_jsxs(View, { style: styles.header, children: [_jsx(Text, { style: [styles.headerText], children: title.toUpperCase() }), _jsx(MyIcon, { icon: isVisible1 ? "eye" : "eye-slash", onPress: () => setVisible1((t) => !t) })] }), isVisible1 && (_jsxs(_Fragment, { children: [PageBar ? _jsx(PageBar, {}) : _jsx(_Fragment, {}), _jsx(FlatList, { keyboardShouldPersistTaps: "handled", data: sortAndFilterByIds(items, pageDetails?.ids ?? items.map((s) => s.id), (s) => s.id), renderItem: ({ item: s }) => (_jsx(CardComponent, { item: s }, s.id)), keyExtractor: (item) => `${item.id}`, style: styles.list, initialNumToRender: 5, maxToRenderPerBatch: 10, windowSize: 10, removeClippedSubviews: true })] }))] }));
});
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        borderRadius: 12,
    },
    content: {},
    list: {},
    header: {
        flexDirection: "row",
        borderBottomWidth: 2,
        // borderBottomColor: "teal",
        padding: 8,
        borderRadius: 6,
        // backgroundColor: "#ccfbf1", // bg-teal-100
        top: 0,
        zIndex: 0,
        width: "100%",
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "center",
        flex: 1,
        color: "#000",
    },
});
