import {Upgrade} from "./Upgrade";
import {Currency} from "../../features/wallet/Currency";
import * as ko from "knockout";
import {ExpUpgradeSaveData} from "./ExpUpgradeSaveData";
import {UpgradeSaveData} from "./UpgradeSaveData";

/**
 * An upgrade that requires experience to level up.
 */
export class ExpUpgrade extends Upgrade {
    defaults = {
        level: 0,
        exp: 0,
    };

    expList: number[];

    private _exp: ko.Observable<number>;

    constructor(identifier: string, displayName: string, maxLevel: number, expList: number[], costList: Currency[], bonusList: number[], increasing: boolean) {
        super(identifier, displayName, maxLevel, costList, bonusList, increasing);
        this.expList = expList;
        this._exp = ko.observable(0);
    }

    gainExp(exp: number): void {
        this.exp = Math.min(this.expList[this.level], this.exp + exp);
    }

    canBuy(): boolean {
        return super.canBuy() && this.hasEnoughExp();
    }

    hasEnoughExp(): boolean {
        return this.exp >= this.expList[this.level];
    }


    load(data: ExpUpgradeSaveData): void {
        this.level = data.level;
        this.exp = data.exp
    }

    parseSaveData(json: Record<string, unknown>): ExpUpgradeSaveData {
        return new ExpUpgradeSaveData(json.level as number ?? 0, json.exp as number ?? 0)
    }

    save(): ExpUpgradeSaveData {
        return new ExpUpgradeSaveData(this.level, this.exp);
    }


    // Knockout getters/setters
    get normalizedExp() {
        if (this.level === 0) {
            return this.exp;
        }
        return this.exp - this.expList[this.level - 1];
    }

    get expPercentage() {
        const nextLevelExp = this.level === 0 ? this.expList[this.level] : this.expList[this.level] - this.expList[this.level - 1];
        return this.normalizedExp / nextLevelExp * 100;
    }

    get progressString(): string {
        const nextLevelExp = this.level === 0 ? this.expList[this.level] : this.expList[this.level] - this.expList[this.level - 1];
        return `${Math.round(this.normalizedExp)}/${nextLevelExp}`;
    }

    // Private as external sources should use gainExp and normalizedExp
    private get exp() {
        return this._exp();
    }

    private set exp(exp: number) {
        this._exp(exp);
    }

}
