import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useVisible } from "../../constants/hooks";
import { MyConfirmModal } from "../MyConfirmModal";
import { MyIcon } from "../MyIcon";
import { MyModal } from "../MyModal";
import { View } from "react-native";
export const MyGenericRow = observer(({ item, FormComponent, deleteItem, fetchFcn, }) => {
    const { isVisible1, setVisible1, isVisible2, setVisible2 } = useVisible();
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
    return (_jsxs(View, { children: [_jsx(MyModal, { isVisible: isVisible1, setVisible: setVisible1, children: _jsx(FormComponent, { item: item, setVisible: setVisible1, fetchFcn: fetchFcn }) }), _jsx(MyConfirmModal, { isVisible: isVisible2, setVisible: setVisible2, onPressCheck: onDelete, actionName: "Delete", msg: msg }), _jsxs(View, { style: { flexDirection: "row", gap: 5, paddingHorizontal: 10 }, children: [_jsx(MyIcon, { icon: "edit", onPress: () => setVisible1(true), size: 20 }), _jsx(MyIcon, { icon: "times", onPress: () => setVisible2(true), size: 20 })] })] }));
});
