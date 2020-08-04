import {Printer} from "./print";

function component() {
    const element = document.createElement('div');


    const btn = document.createElement('button');


    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = Printer.print;

    element.appendChild(btn);
    return element;
}

document.body.appendChild(component());
