import {Saveable} from "../saving/Saveable";
import * as ko from "knockout";
import {Currency} from "../../features/wallet/Currency";
import {App} from "../../App";
import {UpgradeSaveData} from "./UpgradeSaveData";

/**
 * Generic upgrade class
 */
export class Upgrade implements Saveable {
    identifier: string;
    displayName: string;
    maxLevel: number;
    _level: ko.Observable<number> = ko.observable();

    // Describes whether this upgrade increases or decreases a number.
    // (e.g. power is increasing, time is decreasing).
    increasing: boolean;

    // Optional array of costs
    costList: Currency[] = [];
    // Optional array of benefits
    bonusList: number[] = [];

    constructor(identifier: string, displayName: string, maxLevel: number, costList: Currency[], bonusList: number[], increasing = true) {
        this.identifier = identifier;
        this.displayName = displayName;
        this.maxLevel = maxLevel;
        this.level = 0;
        this.costList = costList;
        this.bonusList = bonusList;
        this.increasing = increasing;
    }

    calculateCost(): Currency {
        return this.costList[this.level];
    }

    // Override with a custom function
    calculateBonus(level: number = this.level): number {
        return this.bonusList[level];
    }

    upgradeBonus() {
        if (!this.isMaxLevel()) {
            return this.calculateBonus(this.level + 1) - this.calculateBonus(this.level);
        }
        return 0;
    }

    isMaxLevel() {
        return this.level >= this.maxLevel;
    }

    canAfford(): boolean {
        return App.game.wallet.hasCurrency(this.calculateCost());
    }

    // Override in subclass when other requirements exist.
    canBuy(): boolean {
        return this.level < this.maxLevel && this.canAfford();
    }

    buy(): void {
        if (this.canBuy()) {
            App.game.wallet.loseCurrency(this.calculateCost());
            this.levelUp();
        }
    }

    levelUp(): void {
        this.level = this.level + 1;
    }

    // Knockout getters/setters
    get level(): number {
        return this._level();
    }

    set level(value) {
        this._level(Math.min(value, this.maxLevel));
    }

    // Save logic
    saveKey: string = this.identifier;

    load(data: UpgradeSaveData): void {
        this.level = data.level;
    }

    parseSaveData(json: Record<string, unknown>): UpgradeSaveData {
        return new UpgradeSaveData(json.level as number ?? 0)
    }

    save(): UpgradeSaveData {
        return new UpgradeSaveData(this.level)
    }

}
