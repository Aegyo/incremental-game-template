import {SaveData} from "./SaveData";

export interface Saveable {
    save(): SaveData;

    load(data: SaveData): void;

    parseSaveData(json: Record<string, unknown>): SaveData;
}
