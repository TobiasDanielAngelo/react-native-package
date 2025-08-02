declare const iconMap: {};
export type IconName = keyof typeof iconMap;
interface MyIconProps {
    icon: string;
    color?: string;
    label?: string;
    hidden?: boolean;
    disabled?: boolean;
    onPress?: () => void;
    onLongPress?: () => void;
    size?: number;
}
export declare const MyIcon: React.FC<MyIconProps>;
export {};
