import {App} from "./App";
import * as ko from 'knockout';

declare global {
    interface Window {
        App: App;
    }
}

/**
 * Start the application when all html elements are loaded.
 */
document.addEventListener('DOMContentLoaded', function () {
    App.start();
    ko.applyBindings(App.game, document.getElementById('root'));
    // Expose the App class to the window (and the console)
    if (process.env.DEBUG && typeof window !== undefined) {

        console.log('Exposing App to console');
        window.App = App;
    }

    console.log("Launched");
});


