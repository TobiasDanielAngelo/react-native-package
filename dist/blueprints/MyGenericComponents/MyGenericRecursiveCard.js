import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { ItemDetails } from "../../blueprints/ItemDetails";
import { useVisible } from "../../constants/hooks";
import { MyConfirmModal } from "../MyConfirmModal";
import { MyIcon } from "../MyIcon";
import { MyModal } from "../MyModal";
import { View, StyleSheet } from "react-native";
import { MyDropdownMenu } from "../MyDropdownMenu";
export const MyGenericRecursiveCard = observer(({ item, header, important, prices, shownFields, FormComponent, deleteItem, fetchFcn, items, parentKey, border, itemMap = [], }) => {
    const { isVisible1, setVisible1, isVisible2, setVisible2, isVisible3, setVisible3, } = useVisible();
    const [msg, setMsg] = useState("");
    const [showMore, setShowMore] = useState(false);
    const subItems = items.filter((g) => g[parentKey] === item.id);
    const [showChildren, setShowChildren] = useState(true);
    const onDelete = async () => {
        const resp = await deleteItem(item?.id ?? -1);
        if (!resp.ok) {
            setMsg(resp.details ?? "Error");
            return;
        }
        setVisible2(false);
    };
    const actions = [
        { onPress: () => setVisible1(true), title: "Edit" },
        { onPress: () => setVisible2(true), title: "Delete" },
    ];
    return (_jsxs(View, { style: [styles.card, { borderWidth: border ? 1 : 0 }], children: [_jsx(MyModal, { isVisible: isVisible1, setVisible: setVisible1, children: _jsx(FormComponent, { item: item, setVisible: setVisible1, fetchFcn: fetchFcn }) }), _jsx(MyConfirmModal, { isVisible: isVisible2, setVisible: setVisible2, onPressCheck: onDelete, actionName: "Delete", msg: msg }), _jsxs(View, { style: styles.wrapper, children: [_jsx(View, { style: styles.actionsRow, children: _jsxs(View, { style: styles.relative, children: [_jsx(MyIcon, { icon: "cog", onPress: () => setVisible3((t) => !t) }), _jsx(MyDropdownMenu, { setOpen: setVisible3, open: isVisible3, actions: actions, margin: 0 }), _jsx(MyIcon, { icon: showMore ? "angle-up" : "angle-down", onPress: () => setShowMore((t) => !t) })] }) }), _jsxs(View, { style: styles.flex1, children: [_jsx(ItemDetails, { item: item.$view, shownFields: shownFields, header: header, important: important, prices: prices, showMore: showMore, setShowMore: setShowMore, itemMap: itemMap }), showMore &&
                                subItems.length > 0 &&
                                subItems.map((s) => (_jsx(MyGenericRecursiveCard, { item: s, header: header, important: important, prices: prices, shownFields: shownFields, FormComponent: FormComponent, deleteItem: deleteItem, fetchFcn: fetchFcn, items: items, parentKey: parentKey, itemMap: itemMap }, s.id)))] })] })] }));
});
const styles = StyleSheet.create({
    card: {
        margin: 12, // m-3
        padding: 8, // pt-3
        borderRadius: 8, // rounded-lg
        borderColor: "teal", // border-teal-300
        // For dark mode, override this dynamically
    },
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    flex1: {
        flex: 1,
    },
    actionsRow: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        marginTop: 8,
    },
    relative: {
        flexDirection: "column",
        gap: 10,
        position: "relative",
    },
});
