import { Model } from "./model";
import { View } from "./view";

export class Controller {
    constructor(m : Model, v : View) {
        m.setController( this );
        v.setController( this );

        setInterval(() => {
            if ( m.isDirty() ) {
                v.draw();
                m.clearDirty();
            }
        }, 50);
    }

    // keyboard commands

    up() : void {
        console.log("button");
    }

    down() : void {
        console.log("button");
    }

    left() : void {
        console.log("button");
    }

    right() : void {
        console.log("button");
    }

    // random generator

    random(min : number, max : number) : number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}