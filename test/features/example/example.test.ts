import {Game} from "../../../src/Game";
import {App} from "../../../src/App";

test('test clicking on the example', () => {
    // Arrange
    const game: Game = App.createNewGame();
    expect(game.example.clicks).toBe(0);

    // Act
    game.example.click()

    // Assert
    expect(game.example.clicks).toBe(1);
});
