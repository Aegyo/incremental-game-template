import {UpgradeSaveData} from "./UpgradeSaveData";

export class ExpUpgradeSaveData extends UpgradeSaveData {
    exp: number;

    constructor(level: number, exp: number) {
        super(level)
        this.exp = exp;
    }
}
