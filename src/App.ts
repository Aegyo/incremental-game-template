import {Example} from "./features/example/example";
import {Game} from "./Game";
import {Wallet} from "./features/wallet/Wallet";

export class App {

    static readonly debug = false;
    static game: Game;

    static start(): void {
        App.game = new Game(
            new Example(),
            new Wallet(),
        );

        App.game.initialize();


        App.game.start();
    }
}
