import {SettingOption} from "./SettingOption";

export class StringOption extends SettingOption {
    text: string;
    value: string;

    constructor(text: string, value: string) {
        super(text);
        this.value = value;
    }
}
