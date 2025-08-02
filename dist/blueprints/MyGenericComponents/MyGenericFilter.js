import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { useEffect, useState } from "react";
import { camelToSnakeCase, decodeShortParam, generateShortParam, getMonthName, toOptions, toTitleCase, } from "../../constants/helpers";
import { MyButton } from "../MyButton";
import { MyDateTimePicker } from "../MyDateTimePicker";
import { MyInput } from "../MyInput";
import { MyMultiDropdownSelector } from "../MyMultiDropdownSelector";
import { useSearchParams } from "react-router-native";
import { ScrollView, View } from "react-native";
import { Text } from "react-native";
const getInitialDetails = (fields) => fields.flat().reduce((acc, { name }) => {
    acc[name] = "";
    return acc;
}, {});
const parseMultiValue = (val) => val ? val.split(",").map(Number) : [];
const formatMultiValue = (val) => val.join(",");
const renderField = (field, value, onChangeValue) => {
    const commonProps = {
        label: field.label,
        value,
    };
    switch (field.type) {
        case "number":
        case "text":
            return (_createElement(MyInput, { ...commonProps, key: field.name, onChangeValue: onChangeValue, value: value ?? "" }));
        case "check":
            return (_createElement(MyMultiDropdownSelector, { ...commonProps, key: field.name, options: toOptions(["No", "Yes"]), value: parseMultiValue(value), onChangeValue: (u) => onChangeValue(formatMultiValue(u.map(Number))) }));
        case "date":
        case "time":
        case "datetime":
            return (_jsx(View, { children: _jsx(MyDateTimePicker, { ...commonProps, isDateOnly: ["date", "month"].includes(field.type), isTimeOnly: field.type === "time", onChangeValue: (u) => onChangeValue(field.type === "date"
                        ? moment(u).format("YYYY-MM-DD")
                        : moment(u).toISOString()) }) }, field.name));
        case "year":
            return (_createElement(MyMultiDropdownSelector, { ...commonProps, key: field.name, options: Array.from({ length: 51 }, (_, i) => ({
                    id: 2000 + i,
                    name: String(2000 + i),
                })), value: parseMultiValue(value), onChangeValue: (u) => onChangeValue(formatMultiValue(u.map(Number))) }));
        case "month":
            return (_createElement(MyMultiDropdownSelector, { ...commonProps, key: field.name, options: Array.from({ length: 12 }, (_, i) => ({
                    id: i + 1,
                    name: getMonthName(i),
                })), value: parseMultiValue(value), onChangeValue: (u) => onChangeValue(formatMultiValue(u.map(Number))) }));
        case "day":
            return (_createElement(MyMultiDropdownSelector, { ...commonProps, key: field.name, options: Array.from({ length: 31 }, (_, i) => ({
                    id: i + 1,
                    name: String(i + 1),
                })), value: parseMultiValue(value), onChangeValue: (u) => onChangeValue(formatMultiValue(u.map(Number))) }));
        default:
            return (_jsx(View, { children: _jsx(Text, { children: field.label }) }, field.name));
    }
};
export const MyFilter = observer(({ fields }) => {
    const [details, setDetails] = useState(getInitialDetails(fields));
    const [params, setParams] = useSearchParams();
    const onChangeValue = (val, name) => {
        setDetails({ ...details, [name]: val });
    };
    const onPressFilter = () => {
        if (!Object.entries(details).filter(([_, v]) => v != null && v !== "").length) {
            setParams("");
            return;
        }
        const filtered = Object.fromEntries(Object.entries(details).filter(([_, v]) => v != null && v !== ""));
        setParams("q=" + generateShortParam(filtered));
    };
    const onPressReset = () => {
        setDetails(getInitialDetails(fields));
        setParams("");
    };
    useEffect(() => {
        if (params.size) {
            setDetails(decodeShortParam(params.toString().replace("q=", "")));
        }
    }, [params.size]);
    return (_jsxs(View, { style: { width: 300 }, children: [fields.map((row, i) => (_jsx(View, { children: row.map((field) => renderField(field, details[field.name], (val) => onChangeValue(val, field.name))) }, i))), _jsx(View, { children: _jsx(MyButton, { onPress: onPressFilter, label: "Filter Results" }) })] }));
});
export const MyGenericFilter = ({ view, title = "Filters", dateFields = [], excludeFields = [], relatedFields = [], optionFields = [], }) => {
    const [shownFields, setShownFields] = useState([
        ...Object.keys(view),
        ...optionFields.map((f) => f),
    ]);
    const fields = Object.entries(view).flatMap(([key, value]) => {
        if (excludeFields.includes(key) || !shownFields.includes(key))
            return [];
        const baseName = camelToSnakeCase(key, relatedFields.includes(key));
        const label = toTitleCase(key);
        if (typeof value === "string") {
            if (dateFields.includes(key)) {
                return [
                    [
                        {
                            name: `${baseName}`,
                            label: `${label}`,
                            type: "",
                        },
                    ],
                    [
                        {
                            name: `${baseName}__gte`,
                            label: `Start`,
                            type: "date",
                        },
                        {
                            name: `${baseName}__lte`,
                            label: `End`,
                            type: "date",
                        },
                    ],
                    [
                        {
                            name: `${baseName}__year__in`,
                            label: `Year`,
                            type: "year",
                        },
                        {
                            name: `${baseName}__month__in`,
                            label: `Month`,
                            type: "month",
                        },
                        {
                            name: `${baseName}__day__in`,
                            label: `Day`,
                            type: "day",
                        },
                    ],
                ];
            }
            else {
                return [
                    [
                        {
                            name: `${baseName}__search`,
                            label: `${label} Search`,
                            type: "text",
                        },
                    ],
                ];
            }
        }
        if (typeof value === "number") {
            return [
                [
                    {
                        name: `${baseName}__gte`,
                        label: `${label} ≥`,
                        type: "number",
                    },
                    {
                        name: `${baseName}`,
                        label: `${label} =`,
                        type: "number",
                    },
                    {
                        name: `${baseName}__lte`,
                        label: `${label} ≤`,
                        type: "number",
                    },
                ],
            ];
        }
        if (typeof value === "boolean") {
            return [
                [
                    {
                        name: `${baseName}__in`,
                        label: `${label}?`,
                        type: "check",
                    },
                ],
            ];
        }
        return [];
    });
    const moreFields = optionFields.map((s) => [
        {
            name: `${camelToSnakeCase(s)}__search`,
            label: `${toTitleCase(s)} Search`,
            type: "text",
        },
    ]);
    return (_jsxs(ScrollView, { keyboardShouldPersistTaps: "handled", children: [_jsx(Text, { children: title }), _jsx(MyMultiDropdownSelector, { label: "Fields", value: shownFields, onChangeValue: (t) => setShownFields(t), options: Object.keys(view).map((s) => ({
                    id: s,
                    name: toTitleCase(s),
                })), relative: true }), _jsx(MyFilter, { fields: [...fields, ...moreFields] })] }));
};
