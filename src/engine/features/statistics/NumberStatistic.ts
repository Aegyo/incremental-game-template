import {Statistic} from "./Statistic";
import * as ko from "knockout";

export class NumberStatistic extends Statistic {
    _value: ko.Observable<number>;

    constructor(key: string, value: number = 0) {
        super(key);
        this._value = ko.observable(value);
    }

    public increment(amount: number = 1): void {
        this.value += amount
    }

    // Knockout getters/setters
    get value(): number {
        return this._value();
    }

    set value(value: number) {
        this._value(value);
    }

}
