import {App} from "../../../src/App";

test('test clicking on the example', () => {
    // Arrange
    App.game = App.createNewGame();
    App.game.initialize();
    App.game.start();

    expect(App.game.example.upgrade.level).toBe(0);

    // Act
    App.game.wallet.gainMoney(App.game.example.upgrade.getCost().amount);
    App.game.example.click()

    // Assert
    expect(App.game.example.upgrade.level).toBe(1);

    App.game.stop();
});
