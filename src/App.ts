import {Example} from "./features/example/example";
import {Game} from "./Game";

export class App {

    static readonly debug = false;
    static game: Game;

    static start(): void {
        App.game = new Game(
            new Example()
        );

        App.game.initialize();


        App.game.start();
    }
}
