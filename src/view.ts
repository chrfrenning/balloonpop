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

        ctx.fillStyle = "#EEEEEE";
        ctx.fillRect(0, 0, w, h);

        ctx.font = "18px Comic Sans MS";
        ctx.strokeStyle = "#cccccc";
        ctx.fillStyle = "#cccccc";
        var text = "BalloonPOP! (c) chph.io";
        var metrics = ctx.measureText( text );
        ctx.fillText(text, (w - metrics.width - 10), (h - metrics.actualBoundingBoxAscent) );

        ctx.save();
        this.model.getAllGameObjects().forEach(o => o.draw(ctx));
        this.model.clearDirty();
        ctx.restore();
    }
};