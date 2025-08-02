import { Page, StateSetter } from "../constants/interfaces";
export declare const ResponsiveDrawer: ((props: {
    useStore: () => any;
    open: boolean;
    setOpen: StateSetter<boolean>;
    paths?: Page[];
    onPress: () => void;
}) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
export declare const MyNavBar: ((props: {
    useStore: () => any;
    title?: string;
    profileUrl?: string;
    paths?: Page[];
    drawerOpen: boolean;
    setDrawerOpen: StateSetter<boolean>;
}) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
