import {Feature} from "../../engine/Feature";
import {SaveData} from "../../engine/saving/SaveData";
import {ExampleSaveData} from "./ExampleSaveData";
import * as ko from "knockout";
import {App} from "../../App";

export class Example extends Feature {
    name = "Example"

    private _clicks: ko.Observable<number>;

    public constructor() {
        super();
        this._clicks = ko.observable(0);
    }

    public click(): void {
        this.clicks++;
    }

    initialize(): void {
    }


    update(delta: number) {
        App.game.wallet.gainMoney(this.clicks * delta);
    }

    // Saving logic
    saveKey = "example";

    load(data: ExampleSaveData): void {
        this.clicks = data.clicks
    }

    parseSaveData(json: Record<string, unknown>): SaveData {
        return new ExampleSaveData(json?.clicks as number ?? 0);
    }

    save(): ExampleSaveData {
        return new ExampleSaveData(this.clicks)
    }

    // Knockout getters/setters
    get clicks(): number {
        return this._clicks();
    }

    set clicks(value: number) {
        this._clicks(value);
    }


}
