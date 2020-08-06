import {Feature} from "../../Feature";
import {StatisticsSaveData} from "./StatisticsSaveData";
import {App} from "../../../App";

/**
 * Statistics class to keep track of whatever the player does
 */
export class Statistics extends Feature {
    name = "Statistics";
    saveKey = "statistics";

    totalMoneyGained = 0;

    initialize(): void {
        App.game.wallet.onMoneyGain.subscribe(amount => this.totalMoneyGained += amount);
    }

    load(data: StatisticsSaveData): void {
    }

    parseSaveData(json: Record<string, unknown>): StatisticsSaveData {
        return undefined;
    }

    save(): StatisticsSaveData {
        return undefined;
    }

}
