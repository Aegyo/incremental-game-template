import {Example} from "./features/example/example";

function component() {
    const element = document.createElement('div');


    const btn = document.createElement('button');


    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = Example.print;

    element.appendChild(btn);
    return element;
}

document.body.appendChild(component());
