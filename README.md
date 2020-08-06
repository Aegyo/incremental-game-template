# Incremental Game Template
> A template project to quickly create incremental games with Typescript, knockout and Webpack.

### Introduction
Over the years of developing different incremental games, We have thought about a lot of game-related things.
This project is an attempt to bundle it all together coherently.
It should not be considered as a 'game engine' but mainly a collection of useful scripts that work together.


### Design
The static root object is called `App`. When it is started, it creates an instance of `Game` where you can inject different `Feature`s.
This means that all your features are accessible with `App.game.<feature>`.

We use [https://knockoutjs.com/](knockout) to automatically update the UI when variable changes.
`App.game` is bound to the UI with knockout to make the observables accessible.


### Supported features

##### Abstract feature class
Features implemented like this automatically get included in the game loop.
This means they get called with `update(deltaTime: number)` automatically, as well as being saved and loaded.
Your game will consist of multiple features communicating with each other.

##### Saving and loading
Have your class implement `Saveable` and create a `<class>SaveData` object that extends `SaveData`.

```ts
export class Example implements Saveable {
	...

	saveKey = "example";

	load(data: ExampleSaveData): void {
	    this.clicks = data.clicks
	}

	parseSaveData(json: Record<string, unknown>): SaveData {
	    return new ExampleSaveData(json?.clicks as number ?? 0);
	}

	save(): ExampleSaveData {
	    return new ExampleSaveData(this.clicks)
	}
```

##### Currency system
Allows you to have multiple currencies in your game without code duplication.

```ts
// Add raw values directly
App.game.wallet.gainCurrency(new Currency(10, CurrencyType.money));

// Custom function to apply possible multipliers
App.game.wallet.gainMoney(10);
```

##### Settings
Lets you easily create settings for the user to configure. Supports boolean and multiple choice settings with booleans, numbers and strings

```ts
App.game.settings.add(new BooleanSetting('exampleSetting', 'Doesnt do much really', true));

if (App.game.settings.getSetting('exampleSetting').value) {
    console.log("This setting is true")
}
```

```html
<h2>Example setting: <span data-bind="text: settings.getSetting('exampleSetting').value"> </span>!</h2>
<button data-bind="click: () => settings.getSetting('exampleSetting').toggle()">Toggle setting</button>
```

### Integrated tools
The following frameworks/libraries are currently included
- Typescript
- Webpack
- Knockout
- jQuery
- ESLint
- Jest testing

Other libraries can easily be added via Webpack.
