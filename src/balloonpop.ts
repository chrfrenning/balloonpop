import { Model } from "./model";
import { View } from "./view";
import { Controller } from "./controller";

class State {
    model : Model;
    view : View;
    controller : Controller;

    onKeyDown(e) : boolean {
        e = e || window.event;
    
        switch( e.key ) {
            case 'ArrowUp':
            case 'w':
            case ' ':
                this.controller.up();
                break;
            
            case 'ArrowDown':
            case 's':
                this.controller.down();
                break;
            
            case 'ArrowLeft':
            case 'a':
                this.controller.left();
                break;
            
            case 'ArrowRight':
            case 'd':
                this.controller.right();
                break;
        }
        
        return true;
    }
}

export function wireupGame(document) : void {
    console.log("Initializing BalloonPop!");
    
    document.gameState = new State();

    document.gameState.model = new Model();
    document.gameState.view = new View(document.gameState.model, document.querySelector('canvas'));
    document.gameState.controller = new Controller(document.gameState.model, document.gameState.view);

    document.addEventListener("keydown", document.gameState.onKeyDown);
}

