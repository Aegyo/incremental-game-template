import {Requirement} from "../requirements/Requirement";
import {ISimpleEvent, SimpleEventDispatcher} from "ste-simple-events";
import * as ko from "knockout";
import {RequirementProgress} from "../requirements/RequirementProgress";
import {App} from "../../App";
import {GameState} from "../../GameState";

export class Achievement {
    public name: string;
    public description: string;
    public requirement: Requirement;

    private readonly _unlocked: ko.Observable<boolean>;
    private readonly _completed: ko.PureComputed<boolean>;
    private _onCompletion = new SimpleEventDispatcher<Achievement>();

    constructor(name: string, description: string, requirement: Requirement) {
        this.name = name;
        this.description = description;
        this.requirement = requirement;

        this._unlocked = ko.observable(false);

        this._completed = ko.pureComputed(function () {
            return App.game.state == GameState.playing && this.isCompleted()
        }, this);

        this._completed.subscribe(() => this.complete())
    }

    complete(): void {
        if (!this.unlocked) {
            this.unlocked = true;
            this._onCompletion.dispatch(this)
            this._completed.dispose();
        }
    }

    getProgress(): RequirementProgress {
        return this.requirement.getProgress();
    }

    public isCompleted(): boolean {
        return this.requirement.isCompleted();
    }

    public get onCompletion(): ISimpleEvent<Achievement> {
        return this._onCompletion.asEvent();
    }

    // Knockout getters/setters
    get unlocked(): boolean {
        return this._unlocked();
    }

    set unlocked(value: boolean) {
        this._unlocked(value);
    }


}
