import {Example} from "./features/example/example";
import {Game} from "./Game";
import {Wallet} from "./features/wallet/Wallet";
import {Settings} from "./engine/features/settings/Settings";

export class App {

    static readonly debug = false;
    static game: Game;

    static start(): void {
        App.game = this.createNewGame();

        App.game.initialize();


        App.game.start();
    }

    static createNewGame(): Game {
        return new Game(
            new Settings(),
            new Example(),
            new Wallet(),
        );
    }
}
