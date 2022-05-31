import { Model } from "./model";
import { Controller } from "./controller";

export class View {
    controller : Controller;
    model : Model;
    canvas : HTMLCanvasElement;
    bg : HTMLImageElement;

    constructor(model : Model, canvas : HTMLCanvasElement) {
        this.model = model;
        this.canvas = canvas;

        this.bg = new Image();
        this.bg.src = "./gfx/desert.png";
        this.bg.onload = () => { model.is_dirty = true; };
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

        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(this.bg, -w, 0, w, h);
        ctx.restore();

        ctx.font = "18px Comic Sans MS";
        ctx.strokeStyle = "#cccccc";
        ctx.fillStyle = "#cccccc";
        var text = "BalloonPOP! (c) chph.io";
        var metrics = ctx.measureText( text );
        ctx.fillText(text, (w - metrics.width - 10), (h - metrics.actualBoundingBoxAscent) );

        ctx.save();
        this.model.getAllGameObjects().forEach(o =>{ 
            o.draw(ctx)
            if ( this.controller.debug )
                o.drawBoundingBox(ctx);
        });
        this.model.clearDirty();
        ctx.restore();
    }
};