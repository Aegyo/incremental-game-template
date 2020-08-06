import {Feature} from "../../Feature";
import {StatisticsSaveData} from "./StatisticsSaveData";

/**
 * Statistics class to keep track of whatever the player does
 */
export class Statistics extends Feature {
    name = "Statistics";
    saveKey = "statistics";

    initialize(): void {
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
