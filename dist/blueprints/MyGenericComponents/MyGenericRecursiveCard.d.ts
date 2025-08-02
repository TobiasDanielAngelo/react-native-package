import { ItemDetailsProps, KV } from "../../constants/interfaces";
interface MyGenericRecursiveCardProps<T> extends ItemDetailsProps<T> {
    FormComponent: React.ComponentType<{
        item: T;
        setVisible: (v: boolean) => void;
        fetchFcn: () => void;
    }>;
    deleteItem: (id: number | string) => Promise<{
        ok: boolean;
        details?: string;
    }>;
    fetchFcn: () => void;
    items: T[];
    itemMap?: KV<any>[];
    parentKey: keyof T;
    border?: boolean;
}
export declare const MyGenericRecursiveCard: (<T extends object & {
    id: number | string;
    $view: any;
}>({ item, header, important, prices, shownFields, FormComponent, deleteItem, fetchFcn, items, parentKey, border, itemMap, }: MyGenericRecursiveCardProps<T>) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
export {};
