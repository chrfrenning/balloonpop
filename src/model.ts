import { Point2D, Rectangle, Vector } from './vector';
import { Controller } from "./controller";

export class GameObject {
    boundingbox : Rectangle;
    z_index : number;
    is_dirty : boolean;

    constructor(boundingbox : Rectangle = null) {
        if ( boundingbox == null )
            this.boundingbox = new Rectangle(new Point2D(0,0), 1, 1);
        else
            this.boundingbox = boundingbox;

        this.z_index = 0;
    }

    draw(context : CanvasRenderingContext2D) : void {
        console.log("drawing object");
        context.fillStyle = '#FF0000';
        context.strokeStyle = '#FF0000';
        context.strokeRect(this.boundingbox.position.x, this.boundingbox.position.y, this.boundingbox.width, this.boundingbox.height);
    }

    move(x : number, y : number) : void {
        this.boundingbox.position.x += x;
        this.boundingbox.position.y += y;
        this.is_dirty = true;
    }

    isDirty() : boolean  {
        return this.is_dirty;
    }

    setDirty() : void {
        this.is_dirty = true;
    }

    tick() : void {

    }
};

export class Balloon extends GameObject {
    lives : number = 3;
    img : HTMLImageElement;

    constructor() {
        super(new Rectangle(new Point2D(0,0), 30, 40));

        this.img = new Image();
        this.img.onload = () => { this.is_dirty = true; };
        this.img.src = "./gfx/balloon.png";
    }

    draw(context : CanvasRenderingContext2D) : void {
        context.drawImage(this.img, this.boundingbox.position.x, this.boundingbox.position.y, this.boundingbox.width, this.boundingbox.height);
        if ( document['gameState'].controller.debug )
            super.draw(context);
    }

    move(x : number, y : number) {
        super.move(x, y);
        this.is_dirty = true;
    }

    tick() : void {
        this.move(0, 5);
    }
};

export abstract class Hindrance extends GameObject {
    constructor(boundingbox : Rectangle = null) {
        super(boundingbox);
    }

    abstract getPower() : number;
};

export class Cactus extends Hindrance {
    img : HTMLImageElement;

    constructor() {
        super(new Rectangle(new Point2D(100,100), 30*2, 60*2));

        this.img = new Image();
        this.img.onload = () => { this.is_dirty = true; };
        this.img.src = "./gfx/cactus.png";
    }

    draw(context : CanvasRenderingContext2D) : void {
        context.drawImage(this.img, this.boundingbox.position.x, this.boundingbox.position.y, this.boundingbox.width, this.boundingbox.height);

        if ( document['gameState'].controller.debug )
            super.draw(context);
    }

    tick() : void {
        console.log("cactus ticking");
        this.move(-5, 0);
    }

    getPower(): number {
        return 1;
    }
};

export class Bird extends Hindrance {
    getPower(): number {
        return 2;
    }
};

export abstract class Booster extends GameObject {
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
    is_dirty : boolean = true;
    
    constructor() {
        this.objects.push(new Cactus());
    }

    setController(c : Controller) : void {
        this.controller = c;
    };

    isDirty() : boolean {
        if (this.balloon.isDirty()) return true;
        this.objects.forEach(element => { if (element.isDirty()) this.is_dirty = true; });
        if ( this.is_dirty ) return true;

        return false;
    }

    clearDirty() : void {
        this.is_dirty = false;
        this.objects.forEach(element => element.is_dirty = false);
        this.balloon.is_dirty = false;
    }

    getAllGameObjects() : GameObject[] {
        var objarr : GameObject[] = [];
        
        objarr.push(...this.objects);
        objarr.push(this.balloon);

        return objarr;
    }

    tick() : void {
        this.objects.forEach( e => e.tick() );
        this.balloon.tick();
    }
};