import { StateSetter } from "../constants/interfaces";
type DatePickerProps = {
    date: string;
    setDate: (t: string) => void;
    open: boolean;
    setOpen: StateSetter<boolean>;
};
export declare const DatePicker: ({ date, setDate, open, setOpen, }: DatePickerProps) => import("react/jsx-runtime").JSX.Element;
export {};
