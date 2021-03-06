import {Feature} from "../../engine/Feature";
import {ArrayOfObservables} from "../../engine/knockout/ArrayOfObservables";
import {App} from "../../App";
import {Currency} from "./Currency";
import {CurrencyType} from "./CurrencyType";
import {WalletSaveData} from "./WalletSaveData";
import {ISimpleEvent, SimpleEventDispatcher} from "ste-simple-events";
import {StatisticRequirement} from "../../engine/requirements/StatisticRequirement";

export class Wallet extends Feature {
    name = 'Wallet';
    currencies: ArrayOfObservables<number>;
    requirement: StatisticRequirement

    private _onMoneyGain = new SimpleEventDispatcher<number>();

    constructor() {
        super();
        this.currencies = new ArrayOfObservables([0, 0]);
        this.requirement = new StatisticRequirement('totalMoneyGained', 100);
    }

    public gainMoney(base: number, origin?: string): number {

        const money = base * App.game.getTotalMoneyMultiplier();

        this._onMoneyGain.dispatch(money);
        this.addCurrency(new Currency(money, CurrencyType.money));
        return money;
    }


    private addCurrency(currency: Currency) {
        if (isNaN(currency.amount) || currency.amount <= 0) {
            console.trace(`Could not add currency ${currency.toString()}`);
            return;
        }

        this.currencies[currency.type] += currency.amount;
    }

    public hasCurrency(currency: Currency) {
        return this.currencies[currency.type] >= currency.amount;
    }

    public loseCurrency(currency: Currency) {
        if (isNaN(currency.amount) || currency.amount <= 0) {
            console.trace(`Could not lose currency ${currency.toString()}`);
            return;
        }

        this.currencies[currency.type] -= currency.amount;
    }

    // Saving logic
    saveKey = "wallet";

    load(data: WalletSaveData): void {
        this.currencies = new ArrayOfObservables([data.money, data.somethingElse]);
    }

    save(): WalletSaveData {
        return new WalletSaveData(this.currencies[CurrencyType.money], this.currencies[CurrencyType.somethingElse])
    }

    parseSaveData(json: Record<string, unknown>): WalletSaveData {
        const money = json[CurrencyType[CurrencyType.money]] as number ?? 0;
        const somethingElse = json[CurrencyType[CurrencyType.somethingElse]] as number ?? 0;
        return new WalletSaveData(money, somethingElse);
    }

    initialize(): void {
    }

    canAccess(): boolean {
        return this.requirement.isCompleted();
    }

    public get onMoneyGain(): ISimpleEvent<number> {
        return this._onMoneyGain.asEvent();
    }


}
