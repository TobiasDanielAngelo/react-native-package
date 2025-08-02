import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useVisible } from "../../constants/hooks";
import { ItemDetails } from "../ItemDetails";
import { MyConfirmModal } from "../MyConfirmModal";
import { MyDropdownMenu } from "../MyDropdownMenu";
import { MyIcon } from "../MyIcon";
import { MyModal } from "../MyModal";
import { View, StyleSheet } from "react-native";
export const MyGenericCard = observer(({ item, shownFields, header, important, prices, FormComponent, deleteItem, fetchFcn, moreActions, dropdownActions, itemMap, }) => {
    const { isVisible1, setVisible1, isVisible2, setVisible2, isVisible3, setVisible3, } = useVisible();
    const [showMore, setShowMore] = useState(false);
    const [msg, setMsg] = useState("");
    const onDelete = async () => {
        const resp = await deleteItem(item.id);
        if (!resp.ok) {
            setMsg(resp.details ?? "Error");
            return;
        }
        fetchFcn();
        setVisible2(false);
    };
    const actions = [
        { onPress: () => setVisible1(true), title: "Edit" },
        { onPress: () => setVisible2(true), title: "Delete" },
        ...(dropdownActions ?? []),
    ];
    return (_jsxs(View, { style: styles.card, children: [_jsx(MyModal, { isVisible: isVisible1, setVisible: setVisible1, children: _jsx(FormComponent, { item: item, setVisible: setVisible1, fetchFcn: fetchFcn }) }), _jsx(MyConfirmModal, { isVisible: isVisible2, setVisible: setVisible2, onPressCheck: onDelete, actionName: "Delete", msg: msg }), _jsx(View, { style: styles.wrapper, children: _jsxs(View, { style: styles.flex1, children: [_jsx(ItemDetails, { item: item.$view, shownFields: shownFields, header: header, important: important, prices: prices, showMore: showMore, setShowMore: setShowMore, itemMap: itemMap }), _jsxs(View, { style: styles.actionsRow, children: [_jsxs(View, { style: styles.relative, children: [_jsx(MyIcon, { icon: "cog", onPress: () => setVisible3((t) => !t) }), _jsx(MyDropdownMenu, { setOpen: setVisible3, open: isVisible3, actions: actions, margin: 9 })] }), moreActions?.map((s, ind) => (_jsx(MyIcon, { icon: s.icon, onPress: s.onPress }, ind))), _jsx(MyIcon, { icon: showMore ? "angle-up" : "angle-down", onPress: () => setShowMore((t) => !t) })] })] }) })] }));
});
const styles = StyleSheet.create({
    card: {
        margin: 12, // m-3
        padding: 8, // pt-3
        borderRadius: 8, // rounded-lg
        borderWidth: 1, // border
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
        marginTop: 8, // mt-2 → 8px
        alignItems: "center",
    },
    relative: {
        position: "relative",
    },
});
