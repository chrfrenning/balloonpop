export class Point2D {
    x: number;
    y: number;

    constructor( x: number, y: number ) {
        this.x = x;
        this.y = y;
    }

    duplicate() : Point2D {
        return new Point2D( this.x, this.y );
    }
}

export class Vector {
    x : Point2D;
    y : Point2D;

    constructor( x: Point2D, y: Point2D ) {
        this.x = x;
        this.y = y;
    }

    duplicate() : Vector {
        return new Vector( this.x.duplicate(), this.y.duplicate() );
    }
}

export class Rectangle {
    position : Point2D;
    width : number;
    height : number;

    constructor( position : Point2D, width: number, height: number ) {
        this.position = position;
        this.width = width;
        this.height = height;
    }

    duplicate() : Rectangle {
        return new Rectangle( this.position.duplicate(), this.width, this.height );
    }
}