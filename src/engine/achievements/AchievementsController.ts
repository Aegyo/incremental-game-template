import {Achievements} from "./Achievements";
import {Achievement} from "./Achievement";
import {Controller} from "../controllers/Controller";

/**
 * Example AchievementsController which logs gained achievements to the console
 */
export class AchievementsController extends Controller {
    achievements: Achievements;


    constructor(achievements: Achievements) {
        super();
        this.achievements = achievements;
    }

    public initialize(): void {
        for (const achievement of this.achievements.list) {
            achievement.onCompletion.subscribe(achievement => this.notify(achievement))
        }
    }

    public notify(achievement: Achievement): void {
        console.log(`Achievement gained: ${achievement.name} - ${achievement.description}`)
    }


}
