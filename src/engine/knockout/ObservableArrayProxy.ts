import * as ko from "knockout";

/* eslint-disable */

const handler = {
    get: function (target: any, prop: string) {
        if (target[prop]) { // this lets us use ObservableArray functions like reverse or peek
            return target[prop];
        } else {
            return target()[prop];
        }
    },

    set: function (target: any, prop: string, value: any) {
        target()[prop] = value;

        return true;
    },

    has: function (target: ObservableArrayProxy<unknown>, prop: string) {
        // This is needed for map, forEach etc to work,
        // because they want to check if target.hasOwnProperty("0") first.
        // The ko function doesn't seem to have any OwnProperties anyway, so no harm here (don't quote me)
        return Reflect.has(target(), prop);
    },
}

export type ObservableArrayProxy<T> = Array<T> & ko.ObservableArray<T>;

export function observableArrayProxy<T>(array: T[]): ObservableArrayProxy<T> {
    return new Proxy(ko.observableArray(array), handler);
}

/* eslint-enable */