import { Field } from "../../constants/interfaces";
export declare const MyFilter: (({ fields }: {
    fields: Field[][];
}) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
type Props<T extends Record<string, any>> = {
    view: T;
    title?: string;
    setVisible?: (t: boolean) => void;
    dateFields?: (keyof T)[];
    excludeFields?: (keyof T)[];
    relatedFields?: (keyof T)[];
    optionFields?: (keyof T)[];
};
export declare const MyGenericFilter: <T extends Record<string, any>>({ view, title, dateFields, excludeFields, relatedFields, optionFields, }: Props<T>) => import("react/jsx-runtime").JSX.Element;
export {};
