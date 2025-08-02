import type { Option } from "../constants/interfaces";
export declare const MyDropdownSelector: (props: {
    label?: string;
    value: number | null;
    onChangeValue: (t: number | null) => void;
    options?: Option[];
    msg?: string;
    noSearch?: boolean;
    flex?: number;
}) => import("react/jsx-runtime").JSX.Element;
