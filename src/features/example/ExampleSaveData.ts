import {SaveData} from "../../engine/saving/SaveData";

export class ExampleSaveData extends SaveData {
    clicks: number;


    constructor(clicks: number) {
        super();
        this.clicks = clicks;
    }
}
