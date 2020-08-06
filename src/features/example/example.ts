import {Feature} from "../../engine/Feature";
import {SaveData} from "../../engine/saving/SaveData";
import {ExampleSaveData} from "./ExampleSaveData";
import * as ko from "knockout";
import {App} from "../../App";
import {Upgrade} from "../../engine/upgrades/Upgrade";
import {CurrencyType} from "../wallet/CurrencyType";
import {CurrencyBuilder} from "../wallet/CurrencyBuilder";

export class Example extends Feature {
    name = "Example"

    public upgrade: Upgrade;

    private _clicks: ko.Observable<number>;

    public constructor() {
        super();
        this._clicks = ko.observable(0);
    }

    public click(): void {
        if (this.upgrade.canBuy()) {
            this.upgrade.buy();
        }
    }

    initialize(): void {
        this.upgrade = new Upgrade(
            "example-upgrade", "More money", 3,
            CurrencyBuilder.createArray([5, 10, 25], CurrencyType.money),
            [1, 2, 3, 5])
    }


    update(delta: number): void {
        App.game.wallet.gainMoney(this.upgrade.getBonus() * delta);
    }

    // Saving logic
    saveKey = "example";

    load(data: ExampleSaveData): void {
        this.upgrade.load(data.upgrade);
    }

    parseSaveData(json: Record<string, unknown>): SaveData {
        return new ExampleSaveData(this.upgrade.parseSaveData(json?.upgrade as Record<string, unknown>));
    }

    save(): ExampleSaveData {
        return new ExampleSaveData(this.upgrade.save());
    }

    // Knockout getters/setters
    get clicks(): number {
        return this._clicks();
    }

    set clicks(value: number) {
        this._clicks(value);
    }


}
