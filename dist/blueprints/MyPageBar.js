import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dimensions, Pressable, Text, View } from "react-native";
import { isWideScreen } from "../constants/constants";
import { StyleSheet } from "react-native";
export const MyPageBar = ({ pageDetails, onPressNext, onPressPrev, onPressPage, title, }) => {
    if (!pageDetails)
        return _jsx(_Fragment, {});
    const { currentPage, totalPages, count } = pageDetails;
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 7;
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++)
                pages.push(i);
        }
        else {
            const left = Math.max(2, currentPage - 1);
            const right = Math.min(totalPages - 1, currentPage + 1);
            pages.push(1);
            if (left > 2)
                pages.push("...");
            for (let i = left; i <= right; i++)
                pages.push(i);
            if (right < totalPages - 1)
                pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    };
    return (_jsxs(View, { style: [
            styles.main,
            {
                flexDirection: Dimensions.get("window").width > 600 ? "row" : "column",
            },
        ], children: [_jsxs(View, { children: [_jsx(Text, { children: `Page ${currentPage} of ${totalPages} (${count} items)` }), _jsx(Text, { style: styles.title, children: title.toUpperCase() })] }), _jsxs(View, { style: styles.pageNav, children: [currentPage === 1 ? (_jsx(_Fragment, {})) : (_jsx(Pressable, { style: [styles.navButton, styles.navLeft], children: _jsx(Text, { style: styles.text, onPress: onPressPrev, children: `\u276e` }) })), totalPages <= 1 ? (_jsx(_Fragment, {})) : (getPageNumbers().map((item, index) => (_jsx(Pressable, { style: [
                            styles.navButton,
                            item === currentPage ? styles.selected : {},
                        ], onPress: typeof item === "number" ? () => onPressPage(item) : undefined, children: _jsx(Text, { style: [
                                styles.text,
                                item === currentPage ? styles.selected : {},
                            ], children: item }) }, index)))), currentPage < totalPages && (_jsx(Pressable, { style: [styles.navButton, styles.navRight], children: _jsx(Text, { style: styles.text, onPress: onPressNext, children: `\u276f` }) }))] })] }));
};
const styles = StyleSheet.create({
    main: {
        // flex: 1,
        padding: 10,
        alignItems: "center",
        flexDirection: isWideScreen ? "row" : "column",
        // flexWrap: "wrap",
        justifyContent: "space-between",
        margin: 4,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
    },
    pageNav: {
        flexDirection: "row",
        gap: 2,
    },
    navButton: {
        padding: 1,
        paddingHorizontal: 7,
        backgroundColor: "lightcyan",
        minWidth: 20,
        textAlign: "center",
        alignItems: "center",
    },
    navLeft: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    navRight: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    selected: {
        backgroundColor: "teal",
        color: "white",
    },
    text: {
        fontSize: 15,
    },
});
