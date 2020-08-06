import {Requirement} from "./Requirement";
import {App} from "../../App";

export class StatisticRequirement implements Requirement {
    key: string;
    targetValue: number;


    constructor(key: string, targetValue: number) {
        this.key = key;
        this.targetValue = targetValue;
    }

    isCompleted(): boolean {
        return App.game.statistics.getStatistic(this.key).value >= this.targetValue;
    }

    lockedReason(): string {
        return `The statistic ${App.game.statistics.getStatistic(this.key).key} needs to be at least ${this.targetValue}`;
    }
}
