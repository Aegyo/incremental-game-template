import {Feature} from "../Feature";
import {Achievement} from "./Achievement";
import {AchievementsSaveData} from "./AchievementsSaveData";
import {TotalMoneyRequirement} from "../requirements/TotalMoneyRequirement";

export class Achievements extends Feature {
    name: string = "Achievements";
    saveKey: string = 'achievements';

    list: Achievement[] = [];


    constructor() {
        super();
    }

    initialize(): void {
        this.addAchievement(new Achievement('10-money', 'Gain 10 money', new TotalMoneyRequirement(10)))
        this.addAchievement(new Achievement('100-money', 'Gain 100 money', new TotalMoneyRequirement(100)))
        this.addAchievement(new Achievement('1000-money', 'Gain 1000 money', new TotalMoneyRequirement(1000)))
        this.addAchievement(new Achievement('10000-money', 'Gain 10000 money', new TotalMoneyRequirement(10000)))
    }

    private addAchievement(achievement: Achievement) {
        if (this.getAchievement(achievement.name) !== null) {
            console.error(`Achievement with key ${achievement.name} already exists`);
            return;
        }
        this.list.push(achievement);

    }

    getAchievement(key: string): Achievement {
        for (const achievement of this.list) {
            if (achievement.name === key) {
                return achievement;
            }
        }
        return null;
    }

    load(data: AchievementsSaveData): void {
        for (const key of data.list) {
            const achievement = this.getAchievement(key);
            if (achievement !== null) {
                achievement.unlocked = true
            }
        }
    }

    parseSaveData(json: Record<string, unknown>): AchievementsSaveData {
        const data = new AchievementsSaveData();
        const list = json?.list as string[];
        if (list == null) {
            return data;
        }
        for (const key of list) {
            data.addAchievement(key);
        }
        return data;
    }

    save(): AchievementsSaveData {
        const data = new AchievementsSaveData();
        for (const achievement of this.list) {
            if (achievement.unlocked) {
                data.addAchievement(achievement.name);
            }
        }
        return data;
    }

}
