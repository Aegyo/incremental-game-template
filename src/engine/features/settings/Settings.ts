import {Setting} from "./Setting";
import {OptionValue} from "./OptionValueType";
import {BooleanSetting} from "./BooleanSetting";
import {Feature} from "../../Feature";
import {SaveData} from "../../saving/SaveData";

export class Settings extends Feature {
    list: Setting[] = [];

    public add(setting: Setting): void {
        if (!this.getSetting(setting.name)) {
            this.list.push(setting);
        }
    }


    public setSettingByName(name: string, value: OptionValue): void {
        const setting = this.getSetting(name);
        if (setting) {
            setting.set(value);
        } else {
            console.warn(`Setting ${name} does not exist`);
        }

    }

    public getSetting(name: string): Setting {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].name == name) {
                return this.list[i];
            }
        }
        return null;
    }

    saveKey: string;

    initialize(): void {
        this.add(new BooleanSetting('exampleSetting', 'Doesnt do much really', true));

    }

    load(data: SaveData): void {
    }

    parseSaveData(json: Record<string, unknown>): SaveData {
        return undefined;
    }

    save(): SaveData {
        return undefined;
    }


}


