import { Model } from "./model";
import { View } from "./view";

export class Controller {
    FRAME_RATE : number = 25;

    m : Model;
    v : View;
    debug : boolean = true;

    constructor(m : Model, v : View) {
        this.m = m;
        this.v = v;

        m.setController( this );
        v.setController( this );

        setInterval(() => {
            if ( m.isDirty() ) {
                v.draw();
                m.clearDirty();
            }
        }, 1000 / this.FRAME_RATE);

        setInterval(() => {
            this.m.smallTick();
        }, 1000 / this.FRAME_RATE);

        setInterval(() => {
            this.m.bigTick();
        }, 1000 / 10);
    }

    // keyboard commands

    up() : void {
        this.m.balloon.move(0, -this.random(1, 50));
    }

    down() : void {
        this.m.balloon.move(0, this.random(1, 50));
    }

    left() : void {
        this.m.balloon.move(-this.random(1,50), 0);
    }

    right() : void {
        this.m.balloon.move(this.random(1,50), 0);
    }

    newRandomObject() : void {
        console.log("Implement me!");
    }

    // random generator

    random(min : number, max : number) : number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}