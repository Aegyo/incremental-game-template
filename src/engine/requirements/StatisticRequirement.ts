import {Requirement} from "./Requirement";
import {App} from "../../App";

export class StatisticRequirement extends Requirement {
    key: string;
    targetValue: number;


    constructor(key: string, targetValue: number) {
        super();
        this.key = key;
        this.targetValue = targetValue;
    }

    lockedReason(): string {
        return `The statistic ${App.game.statistics.getStatistic(this.key).key} needs to be at least ${this.targetValue}`;
    }

    getActualValue(): number {
        return App.game.statistics.getStatistic(this.key).value as number;
    }

    getTargetValue(): number {
        return this.targetValue;
    }
}
