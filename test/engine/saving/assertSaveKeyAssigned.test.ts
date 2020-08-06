import {App} from "../../../src/App";
import {Game} from "../../../src/Game";


test('test if the saveKey is set on all features', () => {
    const game: Game = App.createNewGame();

    for (const feature of game.getAllFeatures()) {
        expect(feature.saveKey).toBeDefined();
    }
});
