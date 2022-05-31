import { Model } from "./model";
import { Controller } from "./controller";

export class View {
    controller : Controller;
    model : Model;
    canvas : HTMLCanvasElement;

    constructor(model : Model, canvas : HTMLCanvasElement) {
        this.model = model;
        this.canvas = canvas;
    }

    setController(controller : Controller) {
        this.controller = controller;
    }

    draw() : void {
        const w = this.canvas.width;
        const h = this.canvas.height;

        let ctx = this.canvas.getContext("2d");
        ctx.font = "30px Arial";
        ctx.strokeText("Hello World!", 10, 10);
    }
};