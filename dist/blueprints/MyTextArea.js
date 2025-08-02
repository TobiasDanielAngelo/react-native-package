import { jsx as _jsx } from "react/jsx-runtime";
import { MyInput } from "./MyInput";
export const MyTextArea = (props) => {
    return _jsx(MyInput, { ...props, multiline: true });
};
