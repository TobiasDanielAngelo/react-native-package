import React, { PropsWithChildren } from "react";
type MyDrawerProps = PropsWithChildren<{
    icon?: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}>;
export default function MyDrawer({ children, icon, isOpen, onClose, }: MyDrawerProps): import("react/jsx-runtime").JSX.Element;
export {};
