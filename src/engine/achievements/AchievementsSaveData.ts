/**
 * Unlocked achievements are saved as a list of keys
 */
export class AchievementsSaveData {
    list: string[];

    constructor() {
        this.list = [];
    }

    addAchievement(key: string): void {
        this.list.push(key);
    }

}
