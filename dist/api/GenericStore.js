import { computed } from "mobx";
import { _async, _await, model, Model, modelAction, modelFlow, prop, } from "mobx-keystone";
import { deleteItemRequest, fetchItemsRequest, postItemRequest, updateItemRequest, } from ".";
import AsyncStorage from "@react-native-async-storage/async-storage";
function hasAllItems(obj) {
    return obj && typeof obj === "object" && "allItems" in obj;
}
export function MyModel(keyName, props, derivedProps = () => ({})) {
    const Base = Model(props);
    // @ts-expect-error mobx-keystone decorator returns new class
    @model(`myApp/${keyName}`)
    class GenericModel extends Base {
        update(details) {
            Object.assign(this, details);
        }
        get $() {
            return this;
        }
        get $view() {
            return {
                ...this.$,
                ...derivedProps(this),
            };
        }
    }
    return GenericModel;
}
export function MyStore(keyName, ModelClass, baseURL, slug, resetOnFetch) {
    @model(`myApp/${keyName}Store`)
    class GenericStore extends Model({
        items: prop(() => []),
    }) {
        @computed
        get allItems() {
            const map = new Map();
            this.items.forEach((item) => map.set(item.id ?? -1, item));
            return map;
        }
        @computed
        get itemsSignature() {
            function computeItemsSignature(ModelClass, items) {
                const keys = Object.keys(new ModelClass({}).$view);
                return items
                    .map((item) => keys.map((key) => String(item.$view[key])).join("|"))
                    .join("::");
            }
            return computeItemsSignature(ModelClass, this.items);
        }
        @modelFlow
        fetchAll = _async(function* (params) {
            let result;
            try {
                result = yield* _await(fetchItemsRequest(slug, params));
            }
            catch (error) {
                // Swal.fire({
                //   icon: "error",
                //   title: "Network Error",
                // });
                return { details: "Network Error", ok: false, data: null };
            }
            if (!result.ok || !result.data) {
                // Swal.fire({
                //   icon: "error",
                //   title: "An error has occurred.",
                // });
                return { details: result.details, ok: false, data: null };
            }
            resetOnFetch && this.resetItems();
            result.data.forEach((s) => {
                if (!s.id)
                    return;
                if (!this.items.map((i) => i.$view.id).includes(s.id)) {
                    this.items.push(new ModelClass(s));
                }
                else {
                    this.items.find((t) => t.$view.id === s.id)?.update(s);
                }
            });
            return result;
        });
        @modelFlow
        addItem = _async(function* (details) {
            let result;
            try {
                result = yield* _await(postItemRequest(baseURL, slug, details));
            }
            catch {
                // Swal.fire({ icon: "error", title: "Network Error" });
                return { details: "Network Error", ok: false, data: null };
            }
            if (!result.ok || !result.data) {
                // Swal.fire({ icon: "error", title: "An error has occurred." });
                return { details: result.details, ok: false, data: null };
            }
            const item = new ModelClass(result.data);
            this.items.push(item);
            return { details: "", ok: true, data: item };
        });
        @modelFlow
        updateItem = _async(function* (itemId, details) {
            let result;
            try {
                result = yield* _await(updateItemRequest(baseURL, slug, itemId, details));
            }
            catch {
                // Swal.fire({ icon: "error", title: "Network Error" });
                return { details: "Network Error", ok: false, data: null };
            }
            if (!result.ok || !result.data) {
                // Swal.fire({ icon: "error", title: "An error has occurred." });
                return { details: result.details, ok: false, data: null };
            }
            this.items
                .find((t) => t.$view.id === (result.data?.id ?? -1))
                ?.update(result.data);
            return { details: "", ok: true, data: result.data };
        });
        @modelFlow
        deleteItem = _async(function* (itemId) {
            let result;
            try {
                result = yield* _await(deleteItemRequest(baseURL, slug, itemId));
            }
            catch {
                // Swal.fire({ icon: "error", title: "Network Error" });
                return { details: "Network Error", ok: false, data: null };
            }
            if (!result.ok) {
                return result;
            }
            const index = this.items.findIndex((s) => s.$view.id === itemId);
            if (index !== -1) {
                this.items.splice(index, 1);
            }
            return result;
        });
        @modelFlow
        authBase = _async(function* (method, credentials) {
            let result;
            try {
                result = yield* _await(postItemRequest(`cookie-${method}`, credentials));
                if (result?.data && "key" in result?.data && method !== "logout") {
                    AsyncStorage.setItem("token", result.data.key);
                }
                if (method === "logout") {
                    AsyncStorage.removeItem("token");
                }
            }
            catch (error) {
                // Swal.fire({
                //   icon: "error",
                //   title: "Network Error",
                // });
                error;
                return { details: "Network Error", ok: false, data: null };
            }
            if (!result.ok || !result.data) {
                // Swal.fire({
                //   icon: "error",
                //   title: "An error has occurred.",
                // });
                return { details: "An Error Occurred", ok: false, data: null };
            }
            return { details: "", ok: true, data: null };
        });
        @modelAction
        resetItems = function () {
            this.items = [];
        };
    }
    return GenericStore;
}
export const functionBinder = (item) => {
    for (const key of Object.getOwnPropertyNames(item)) {
        if (typeof item[key] === "function") {
            item[key] = item[key].bind(item);
        }
    }
    const proto = Object.getPrototypeOf(item);
    for (const key of Object.getOwnPropertyNames(proto)) {
        if (key === "constructor")
            continue;
        const desc = Object.getOwnPropertyDescriptor(proto, key);
        if (desc?.value && typeof desc.value === "function") {
            item[key] = desc.value.bind(item);
        }
    }
};
