export type Menu = {
    name: string;
    label: string;
    onPress: () => void;
    selected?: boolean;
};
export declare const MenuCard: (props: Menu) => import("react/jsx-runtime").JSX.Element;
