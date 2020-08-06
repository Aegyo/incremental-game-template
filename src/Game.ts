import * as ko from "knockout";

import {Example} from "./features/example/example";
import {GameState} from "./GameState";
import {Feature} from "./engine/Feature";
import {Wallet} from "./features/wallet/Wallet";
import {LocalStorage} from "./engine/saving/LocalStorage";
import {Settings} from "./engine/features/settings/Settings";
import {Statistics} from "./engine/features/statistics/Statistics";

export class Game {
    private _tickInterval: any;

    public settings: Settings;
    public example: Example;
    public wallet: Wallet;
    public statistics: Statistics;

    private readonly _state: ko.Observable<GameState>;

    private readonly TICK_DURATION_MS = 100.0;

    constructor(settings: Settings, example: Example, wallet: Wallet, statistics: Statistics) {
        this.settings = settings;
        this.example = example;
        this.wallet = wallet
        this.statistics = statistics;

        this._state = ko.observable(GameState.starting);
    }

    private update(): void {
        for (const feature of this.getAllFeatures()) {
            feature.update(this.TICK_DURATION_MS / 1000.0)
        }
    }

    public initialize(): void {
        for (const feature of this.getAllFeatures()) {
            feature.initialize();
        }

        this.load()
    }

    public start(): void {
        this._tickInterval = setInterval(() => this.update(), this.TICK_DURATION_MS);

        this.state = GameState.playing;
        console.log("Started");
    }


    public save(): void {
        const res: Record<string, unknown> = {};
        for (const feature of this.getAllFeatures()) {
            res[feature.saveKey] = feature.save()
        }
        console.log(res);
        LocalStorage.store('save', res)
    }

    public load(): void {
        const saveData = LocalStorage.get('save')
        for (const feature of this.getAllFeatures()) {
            const featureSavedata: Record<string, unknown> = saveData == null ? {} : saveData[feature.saveKey] as Record<string, unknown> ?? {};
            feature.load(feature.parseSaveData(featureSavedata));
        }
    }

    public getTotalMoneyMultiplier(): number {
        let res = 1;
        for (const feature of this.getAllFeatures()) {
            res *= feature.getMoneyMultiplier();
        }
        return res;
    }

    public getAllFeatures(): Feature[] {
        // TODO(@Isha) Improve with JS hacks to gain all features
        return [this.settings, this.example, this.wallet, this.statistics];
    }


    // Knockout getters/setters
    get state(): GameState {
        return this._state();
    }

    set state(value: GameState) {
        this._state(value);
    }
}
