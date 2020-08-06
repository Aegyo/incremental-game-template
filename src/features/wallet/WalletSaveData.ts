import {SaveData} from "../../engine/saving/SaveData";

export class WalletSaveData extends SaveData {
    money: number;
    somethingElse: number;


    constructor(money: number, somethingElse: number) {
        super();
        this.money = money;
        this.somethingElse = somethingElse;
    }
}
