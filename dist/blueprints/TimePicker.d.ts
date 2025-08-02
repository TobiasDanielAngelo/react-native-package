import { StateSetter } from "../constants/interfaces";
type TimePickerProps = {
    time: string;
    setTime: (t: string) => void;
    open: boolean;
    setOpen: StateSetter<boolean>;
};
export declare const TimePicker: ({ time, setTime, open, setOpen, }: TimePickerProps) => import("react/jsx-runtime").JSX.Element;
export {};
