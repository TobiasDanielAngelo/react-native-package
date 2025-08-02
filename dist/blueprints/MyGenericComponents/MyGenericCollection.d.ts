import { PaginatedDetails } from "../../constants/interfaces";
export declare const MyGenericCollection: (<T extends {
    id: number | string;
}>(props: {
    PageBar?: React.FC;
    pageDetails?: PaginatedDetails | undefined;
    items: T[];
    CardComponent: React.ComponentType<{
        item: T;
    }>;
    title: string;
}) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
