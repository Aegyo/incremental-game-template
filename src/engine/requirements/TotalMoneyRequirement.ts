import {StatisticRequirement} from "./StatisticRequirement";

export class TotalMoneyRequirement extends StatisticRequirement {

    constructor(targetValue: number) {
        super('totalMoneyGained', targetValue);
    }

    lockedReason(): string {
        return `Total money needs to be at least ${this.targetValue}`;
    }
}
