import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { useEffect, useState } from "react";
export function useSettings(settingStore, defaultValue, key) {
    const [state, setState] = useState(defaultValue);
    useEffect(() => {
        const load = async () => {
            try {
                const stored = await AsyncStorage.getItem(key);
                if (stored) {
                    setState(JSON.parse(stored));
                    return;
                }
                const setting = settingStore.items.find((s) => s.key === key);
                if (setting?.value) {
                    setState(JSON.parse(setting.value));
                }
                else {
                    setState(defaultValue);
                }
            }
            catch {
                setState(defaultValue);
            }
        };
        load();
    }, [key, settingStore]);
    useEffect(() => {
        const save = async () => {
            try {
                const json = JSON.stringify(state);
                const setting = settingStore.items.find((s) => s.key === key);
                const settingId = setting?.id;
                settingId
                    ? settingStore.updateItem(settingId, { value: json })
                    : settingStore.addItem({ key, value: json });
                await AsyncStorage.setItem(key, json);
            }
            catch {
                // handle error if needed
            }
        };
        if (settingStore.items.length > 0) {
            save();
        }
    }, [state, key, settingStore]);
    return [state, setState];
}
/**
 * useVisibleMap - Custom hook to manage multiple visibility states (1 to count).
 *
 * @param count - Positive integer. The hook creates keys 1 to `count`, each mapped to a boolean.
 *
 * @returns An object containing:
 * - `visible`: Record<number, boolean> — the visibility state of each key.
 * - `setVisible(key, value)`: Set a specific key's visibility.
 * - `toggleVisible(key)`: Toggle a specific key's visibility.
 * - `setVisible1`, `setVisible2`, ..., `setVisibleN`: Direct setters for each key for cleaner usage.
 *
 * Example:
 * const { visible, setVisible1, toggleVisible } = useVisibleMap(4);
 * setVisible1?.(true);       // Sets visible[1] = true
 * toggleVisible(2);          // Toggles visible[2]
 *
 * console.log(visible[1]);   // true
 */
export function useVisible() {
    const indices = Array.from({ length: 10 }, (_, i) => (i + 1));
    const initialMap = Object.fromEntries(indices.map((i) => [i, false]));
    const [isVisible, setVisibleState] = useState(initialMap);
    const toggleVisible = (key) => setVisibleState((prev) => ({ ...prev, [key]: !prev[key] }));
    const setVisible = (key, value) => setVisibleState((prev) => ({ ...prev, [key]: value }));
    const individualSetters = Object.fromEntries(indices.map((i) => {
        const setter = (value) => {
            setVisibleState((prev) => ({
                ...prev,
                [i]: typeof value === "function" ? value(prev[i]) : value,
            }));
        };
        return [`setVisible${i}`, setter];
    }));
    const isVisibleMap = Object.fromEntries(indices.map((i) => [`isVisible${i}`, isVisible[i]]));
    return {
        isVisible,
        toggleVisible,
        setVisible,
        ...individualSetters,
        ...isVisibleMap,
    };
}
export const useIsUnhoverable = () => {
    const [isUnhoverable, setIsUnhoverable] = useState(false);
    useEffect(() => {
        const query = window.matchMedia("(hover: none)");
        const handler = (e) => setIsUnhoverable(e.matches);
        setIsUnhoverable(query.matches); // initial check
        query.addEventListener("change", handler);
        return () => query.removeEventListener("change", handler);
    }, []);
    return isUnhoverable;
};
export function useLocalStorageState(defaultValue, key) {
    const [state, setState] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : defaultValue;
        }
        catch {
            return defaultValue;
        }
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
}
export const useCalendarProps = () => {
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState("month");
    const range = view === "week"
        ? moment(date).format("YYYY-MM-DD")
        : view === "month"
            ? moment(date).format("YYYY-MM")
            : view === "year"
                ? moment(date).format("YYYY")
                : "month";
    const start = moment(date).startOf("day");
    const end = moment(date).endOf("day");
    return { date, setDate, view, setView, range, start, end };
};
