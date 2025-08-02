import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { useWindowDimensions } from "react-native";
import { useSearchParams } from "react-router-native";
import { toTitleCase } from "../../constants/helpers";
import { useSettings } from "../../constants/hooks";
import { MyModal } from "../MyModal";
import { MyMultiDropdownSelector } from "../MyMultiDropdownSelector";
import { MyPageBar } from "../MyPageBar";
import { MySpeedDial } from "../MySpeedDial";
export const useViewValues = (settingStore, name, obj, graphs = ["pie", "line"]) => {
    const [pageDetails, setPageDetails] = useState();
    const [params, setParams] = useSearchParams();
    const availableGraphs = graphs;
    const objWithFields = obj.$view;
    const [graph, setGraph] = useSettings(settingStore, "pie", `graph${name}`);
    const [shownFields, setShownFields] = useSettings(settingStore, Object.keys(objWithFields), `shownFields${name}`);
    const [sortFields, setSortFields] = useSettings(settingStore, [], `sortFields${name}`);
    return {
        pageDetails,
        setPageDetails,
        params,
        setParams,
        availableGraphs,
        graph,
        setGraph,
        shownFields,
        setShownFields,
        sortFields,
        setSortFields,
        objWithFields,
    };
};
export const MyGenericView = observer((props) => {
    const { fetchFcn, Context, CollectionComponent, TableComponent, FormComponent, FilterComponent, objWithFields, actionModalDefs, isVisible, useStore, setVisible, shownFields, setShownFields, availableGraphs, pageDetails, setPageDetails, params, setParams, itemMap, sortFields, setSortFields, graph, setGraph, title, } = props;
    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width;
    const { settingStore } = useStore();
    const setVisibleForIndex = (index) => {
        return (value) => {
            setVisible(index, value); // Use setVisible with the given index
        };
    };
    const defaultActionModalDefs = [
        {
            icon: "wpforms",
            label: "NEW",
            name: `Add ${title}`,
            modal: (_jsx(FormComponent, { fetchFcn: fetchFcn, setVisible: setVisibleForIndex(1) })),
        },
        {
            icon: "tasks",
            label: "FIELDS",
            name: "Show Fields",
            modal: (_jsx(MyMultiDropdownSelector, { label: "Fields", value: shownFields, onChangeValue: (t) => setShownFields(t), options: Object.keys(objWithFields).map((s) => ({
                    id: s,
                    name: toTitleCase(s),
                })), relative: true, open: true })),
        },
        {
            icon: "filter",
            label: "FILTERS",
            name: "Filters",
            modal: _jsx(FilterComponent, {}),
        },
    ];
    const graphIconMap = availableGraphs.reduce((acc, type) => {
        const iconMap = {
            pie: { icon: "chart-pie", label: "PIE" },
            line: { icon: "chart-line", label: "LINE" },
            bar: { icon: "chart-bar", label: "BAR" },
            area: { icon: "chart-area", label: "AREA" },
        };
        acc[type] = iconMap[type];
        return acc;
    }, {});
    const [view, setView] = useSettings(settingStore, "table", `view${title.replace(" ", "")}`);
    const toggleView = () => {
        setView((prev) => (prev === "card" ? "table" : "card"));
    };
    const toggleGraph = () => {
        setGraph((prev) => {
            const currentIndex = availableGraphs.indexOf(prev);
            const nextIndex = (currentIndex + 1) % availableGraphs.length;
            return availableGraphs[nextIndex];
        });
    };
    const updatePage = (updateFn) => {
        setParams((t) => {
            const p = new URLSearchParams(t);
            const curr = Number(p.get("page")) || 1;
            p.set("page", String(updateFn(curr)));
            return p;
        });
    };
    const PageBar = () => (_jsx(MyPageBar, { pageDetails: pageDetails, onPressPrev: () => updatePage((curr) => Math.max(curr - 1, 1)), onPressNext: () => updatePage((curr) => Math.min(curr + 1, pageDetails?.totalPages ?? curr)), onPressPage: (n) => updatePage(() => n), title: title }));
    const Modals = [...defaultActionModalDefs, ...(actionModalDefs ?? [])]
        .map((s) => s.modal)
        .map((child, i) => (_jsx(MyModal, { isVisible: isVisible[i + 1], setVisible: (v) => setVisible(i + 1, typeof v === "function" ? v(isVisible[i + 1]) : v), disableClose: true, children: child }, i)));
    const views = useMemo(() => [
        {
            icon: view === "card" ? "id-card" : "table",
            name: "Toggle View",
            onPress: toggleView,
        },
        {
            icon: {
                ...(graphIconMap[graph] ?? { icon: "question", label: "N/A" }),
            }.icon,
            name: "Toggle Graphs",
            onPress: toggleGraph,
        },
    ], [view, graph]);
    const actions = useMemo(() => [...defaultActionModalDefs, ...(actionModalDefs ?? [])].map((def, i) => ({
        icon: def.icon,
        name: def.name,
        onPress: () => setVisible(i + 1, true),
    })), [setVisible, actionModalDefs, defaultActionModalDefs]);
    useEffect(() => {
        fetchFcn();
    }, [params]);
    const value = {
        shownFields,
        setShownFields,
        params,
        setParams,
        pageDetails,
        setPageDetails,
        PageBar,
        fetchFcn,
        itemMap,
        graph,
        sortFields,
        setSortFields,
    };
    return (_jsxs(Context.Provider, { value: value, children: [view === "card" ? _jsx(CollectionComponent, {}) : _jsx(TableComponent, {}), Modals, isPortrait ? (_jsx(MySpeedDial, { actions: [...actions, ...views] })) : (_jsxs(_Fragment, { children: [_jsx(MySpeedDial, { actions: actions }), _jsx(MySpeedDial, { actions: views, leftSide: true })] }))] }));
});
