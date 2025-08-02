import { ItemDetailsProps, KV, Page } from "../../constants/interfaces";
export interface IAction {
    onPress: () => void;
    icon: string;
    color?: "inherit" | "action" | "disabled" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
}
interface MyGenericCardProps<T> extends ItemDetailsProps<T> {
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
    moreActions?: IAction[];
    dropdownActions?: Page[];
    itemMap?: KV<any>[];
}
export declare const MyGenericCard: (<T extends object & {
    id: number | string;
    $view: any;
}>({ item, shownFields, header, important, prices, FormComponent, deleteItem, fetchFcn, moreActions, dropdownActions, itemMap, }: MyGenericCardProps<T>) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
export {};
