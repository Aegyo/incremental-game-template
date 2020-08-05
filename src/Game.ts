import {Observable} from "knockout";
import * as ko from "knockout";

import {Example} from "./features/example/example";
import {GameState} from "./GameState";

export class Game {
    private _tickInterval: any;

    public example: Example;

    private readonly _state: Observable<GameState>;

    private readonly TICK_DURATION_MS = 50;

    constructor(example: Example) {
        this.example = example;
        this._state = ko.observable(GameState.starting);
    }

    private update(): void {

    }

    public initialize(): void {

    }

    public start(): void {
        this._tickInterval = setInterval(() => this.update(), this.TICK_DURATION_MS);
        this.state = GameState.playing;
        console.log("Started");
    }


    // Knockout getters/setters
    get state(): GameState {
        return this._state();
    }

    set state(value: GameState) {
        this._state(value);
    }
}
