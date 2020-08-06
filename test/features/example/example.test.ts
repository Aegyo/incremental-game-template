import {Example} from "../../../src/features/example/example";
import {Wallet} from "../../../src/features/wallet/Wallet";
import {App} from "../../../src/App";
import {Game} from "../../../src/Game";
import {WalletSaveData} from "../../../src/features/wallet/WalletSaveData";
import {ExampleSaveData} from "../../../src/features/example/ExampleSaveData";

// TODO(@Isha) this is untestable, find a way to dependency inject features
test('test clicking on the example', () => {
    const example: Example = new Example();
    App.game = new Game(example, new Wallet);
    App.game.wallet.load(new WalletSaveData(0, 0));
    App.game.example.load(new ExampleSaveData(3));
    expect(example.clicks).toBe(3);
    example.click();
    expect(example.clicks).toBe(4);
});
