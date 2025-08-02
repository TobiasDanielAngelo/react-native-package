import { StateSetter } from "../constants/interfaces";
type DatePickerProps = {
    dateTime: string;
    setDateTime: (t: string) => void;
    open: boolean;
    setOpen: StateSetter<boolean>;
};
export declare const DateTimePicker: ({ dateTime, setDateTime, open, setOpen, }: DatePickerProps) => import("react/jsx-runtime").JSX.Element;
export {};
