import React from "react";
import { PaginatedDetails } from "../constants/interfaces";
export type MyPageBarProps = {
    pageDetails?: PaginatedDetails;
    onPressNext: () => void;
    onPressPrev: () => void;
    onPressPage: (page: number) => void;
    title: string;
};
export declare const MyPageBar: React.FC<MyPageBarProps>;
