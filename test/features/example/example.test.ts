import {Example} from "../../../src/features/example/example";
import {Wallet} from "../../../src/features/wallet/Wallet";
import {App} from "../../../src/App";

// TODO(@Isha) this is untestable, find a way to dependency inject features
test('test clicking on the example', () => {
    App.game.wallet = new Wallet();
    const example: Example = new Example();
    expect(example.clicks).toBe(0);
    example.click();
    expect(example.clicks).toBe(1);
});
