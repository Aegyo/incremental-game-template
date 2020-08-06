import {Feature} from "../../Feature";
import {StatisticsSaveData} from "./StatisticsSaveData";
import {App} from "../../../App";
import {Statistic} from "./Statistic";
import {NumberStatistic} from "./NumberStatistic";
import {SettingsSaveData} from "../settings/SettingsSaveData";
import {OptionValue} from "../settings/OptionValueType";
import {StatisticsValue} from "./StatisticsValueType";

/**
 * Statistics class to keep track of increasing numbers
 */
export class Statistics extends Feature {
    name = "Statistics";
    saveKey = "statistics";

    list: Record<string, Statistic>


    constructor() {
        super();
        this.list = {};
    }

    initialize(): void {

        this.registerStatistic(new NumberStatistic('totalMoneyGained'))

        App.game.wallet.onMoneyGain.subscribe(amount => this.incrementNumberStatistic('totalMoneyGained', amount));
    }

    incrementNumberStatistic(key: string, amount = 1): void {
        if (!this.hasStatistic(key)) {
            console.warn(`Could not find statistic with key ${key}`)
            return;
        }
        this.list[key].value += amount;
    }

    public getStatistic(key: string): Statistic {
        if (!this.hasStatistic(key)) {
            console.warn(`Could not find statistic with key ${key}`)

            return null;
        } else {
            return this.list[key];
        }
    }

    private hasStatistic(key: string): boolean {
        return key in this.list
    }

    private registerStatistic(statistic: Statistic) {
        this.list[statistic.key] = statistic;
    }

    load(data: StatisticsSaveData): void {
        console.log(data);
        for (const key in data.list) {
            if (Object.prototype.hasOwnProperty.call(data.list, key)) {
                if (this.hasStatistic(key)) {
                    this.list[key].value = data.list[key];
                } else {
                    console.warn(`Could not load statistic ${key}`)
                }
            }
        }
    }

    parseSaveData(json: Record<string, unknown>): StatisticsSaveData {
        const data = new StatisticsSaveData();
        const list = json.list as Record<string, StatisticsValue>;
        for (const key in list) {
            if (Object.prototype.hasOwnProperty.call(list, key)) {
                data.addStatistic(key, list[key])
            }
        }
        return data;
    }

    save(): StatisticsSaveData {
        const data = new StatisticsSaveData();
        for (const key in this.list) {
            data.addStatistic(key, this.list[key].value);
        }
        return data;
    }

}
