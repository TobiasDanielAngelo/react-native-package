import { CalendarEvent, StateSetter } from "../constants/interfaces";
export declare const MyCalendar: ((props: {
    date: Date;
    setDate: StateSetter<Date>;
    events?: CalendarEvent[];
    noModal?: boolean;
}) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
