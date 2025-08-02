import { GraphType, KV, PaginatedDetails, StateSetter } from "../../constants/interfaces";
import { SetURLSearchParams } from "react-router-native";
export interface GenericViewProps<T> {
    shownFields: (keyof T)[];
    setShownFields: StateSetter<(keyof T)[]>;
    sortFields: string[];
    setSortFields: StateSetter<string[]>;
    params: URLSearchParams;
    setParams: SetURLSearchParams;
    pageDetails: PaginatedDetails | undefined;
    setPageDetails: StateSetter<PaginatedDetails | undefined>;
    PageBar: React.FC;
    fetchFcn: () => void;
    itemMap: KV<any>[];
    graph?: GraphType;
}
export declare const defaultViewValues: GenericViewProps<{}>;
export declare function createGenericViewContext<T>(): {
    Context: import("react").Context<GenericViewProps<T>>;
    useGenericView: () => GenericViewProps<T>;
};
export declare function createGenericContext<T>(): {
    Context: import("react").Context<T>;
    useGeneric: () => T;
};
