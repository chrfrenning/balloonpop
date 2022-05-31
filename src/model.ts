import { Point2D, Rectangle, Vector } from './vector';
import { Controller } from "./controller";

export class GameObject {
    boundingbox : Rectangle;
};

export class Balloon extends GameObject {
    lives : number = 3;
};

export abstract class Hindrance {
    abstract getPower() : number;
};

export class Cactus extends Hindrance {
    getPower(): number {
        return 1;
    }
};

export class Bird extends Hindrance {
    getPower(): number {
        return 2;
    }
};

export abstract class Booster {
     abstract getValue() : number;
};

export class Coin extends Booster {
    getValue() : number {
        return 1;
    }
};

export class Model {
    controller : Controller;

    balloon : Balloon = new Balloon();
    objects : GameObject[] = [];
    points : number = 0;
    dirty : boolean = true;
    
    constructor() {
    }

    setController(c : Controller) : void {
        this.controller = c;
    };

    isDirty() : boolean {
        return this.dirty;
    }

    clearDirty() : void {
        this.dirty = false;
    }
};