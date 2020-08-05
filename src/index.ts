import {App} from "./App";
import * as ko from 'knockout';
import * as $ from 'jquery';

declare global {
    interface Window {
        App: App;
    }
}

/**
 * Start the application when all html elements are loaded.
 */
$(function () {
    App.start();
    ko.applyBindings(App.game, document.getElementById('root'));
    // Expose the App class to the window (and the console)
    if (process.env.DEBUG && typeof window !== undefined) {

        console.log('Exposing App to console');
        window.App = App;
    }

    console.log("Launched");
});


