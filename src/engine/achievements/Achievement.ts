import {Requirement} from "../requirements/Requirement";
import {ISimpleEvent, SimpleEventDispatcher} from "ste-simple-events";
import * as ko from "knockout";
import {RequirementProgress} from "../requirements/RequirementProgress";

export class Achievement {
    public name: string;
    public description: string;
    public requirement: Requirement;
    private readonly _unlocked: ko.PureComputed<boolean>;

    private _onCompletion = new SimpleEventDispatcher<Achievement>();

    constructor(name: string, description: string, requirement: Requirement) {
        this.name = name;
        this.description = description;
        this.requirement = requirement;

        this._unlocked = ko.pureComputed(function () {
            return this.isCompleted()
        }, this);

        this._unlocked.subscribe(() => this._onCompletion.dispatch(this))
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
