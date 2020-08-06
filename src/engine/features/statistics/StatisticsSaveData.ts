import {StatisticsValue} from "./StatisticsValueType";

export class StatisticsSaveData {
    list: Record<string, StatisticsValue>;

    constructor() {
        this.list = {};
    }

    addStatistic(key: string, value: StatisticsValue): void {
        this.list[key] = value;
    }

}
