import { Point2D, Rectangle, Vector } from './vector';
import { Controller } from "./controller";

export class GameObject {
    world : World;
    boundingbox : Rectangle;
    z_index : number;
    is_dirty : boolean;

    constructor(world : World, boundingbox : Rectangle = null) {
        this.world = world;

        if ( boundingbox == null )
            this.boundingbox = new Rectangle(new Point2D(0,0), 1, 1);
        else
            this.boundingbox = boundingbox;

        this.z_index = 0;
    }

    draw(context : CanvasRenderingContext2D) : void {
        this.drawBoundingBox(context);   
    }

    drawBoundingBox(context : CanvasRenderingContext2D) : void {
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

    smallTick() : void {

    }

    bigTick() : void {

    }
};

export class Balloon extends GameObject {
    lives : number = 3;
    img : HTMLImageElement;

    constructor(world : World) {
        super(world, new Rectangle(new Point2D(0,0), 30, 40));

        this.img = new Image();
        this.img.onload = () => { this.is_dirty = true; };
        this.img.src = "./gfx/balloon.png";

        this.z_index = 1000; // put it high so it's always on top
    }

    draw(context : CanvasRenderingContext2D) : void {
        context.drawImage(this.img, this.boundingbox.position.x, this.boundingbox.position.y, this.boundingbox.width, this.boundingbox.height);
    }

    move(x : number, y : number) {
        super.move(x, y);
        this.is_dirty = true;
    }

    smallTick() : void {
        this.move(0, 1);
    }
};

export abstract class Hindrance extends GameObject {
    constructor(world : World, boundingbox : Rectangle = null) {
        super(world, boundingbox);
    }

    abstract getPower() : number;
};

export class Cactus extends Hindrance {
    img : HTMLImageElement;

    constructor(world : World) {
        super(world, new Rectangle(new Point2D(100,100), 30*2, 60*2));

        this.img = new Image();
        this.img.onload = () => { this.is_dirty = true; };
        this.img.src = "./gfx/cactus.png";
    }

    draw(context : CanvasRenderingContext2D) : void {
        context.drawImage(this.img, this.boundingbox.position.x, this.boundingbox.position.y, this.boundingbox.width, this.boundingbox.height);
    }

    smallTick() : void {
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

export class World {
    width : number = 1600;
    height : number = 900;
    gravity : number = 0.5;
    friction : number = 0.5;
};

export class Model {
    controller : Controller;

    world : World = new World();

    balloon : Balloon = new Balloon(this.world);
    objects : GameObject[] = [];
    points : number = 0;
    is_dirty : boolean = true;
    
    constructor() {
        this.objects.push(new Cactus(this.world));
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

        objarr.sort( (a, b) => a.z_index < b.z_index ? -1 : 1 );

        return objarr;
    }

    smallTick() : void {
        this.objects.forEach( e => e.smallTick() );
        this.balloon.smallTick();
    }

    bigTick() : void {
        this.objects.forEach( e => e.bigTick() );
        this.balloon.bigTick();
    }
};