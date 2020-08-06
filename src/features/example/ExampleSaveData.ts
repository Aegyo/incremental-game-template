import {SaveData} from "../../engine/saving/SaveData";
import {UpgradeSaveData} from "../../engine/upgrades/UpgradeSaveData";

export class ExampleSaveData extends SaveData {
    upgrade: UpgradeSaveData;


    constructor(upgrade: UpgradeSaveData) {
        super();
        this.upgrade = upgrade;
    }
}
