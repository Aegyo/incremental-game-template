import {SaveData} from "./saving/SaveData";
import {Saveable} from "./saving/Saveable";

export abstract class Feature implements Saveable {
    name: string;

    abstract initialize(): void;

    // Default false to avoid not implementing the proper restrictions
    canAccess(): boolean {
        return false;
    }

    getMoneyMultiplier(): number {
        return 1;
    }

    update(delta: number): void {

    }

    abstract load(data: SaveData): void;

    abstract save(): SaveData;

    abstract parseSaveData(json: Record<string, unknown>): SaveData;

}
