var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("vector", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Rectangle = exports.Vector = exports.Point2D = void 0;
    var Point2D = /** @class */ (function () {
        function Point2D(x, y) {
            this.x = x;
            this.y = y;
        }
        Point2D.prototype.duplicate = function () {
            return new Point2D(this.x, this.y);
        };
        return Point2D;
    }());
    exports.Point2D = Point2D;
    var Vector = /** @class */ (function () {
        function Vector(x, y) {
            this.x = x;
            this.y = y;
        }
        Vector.prototype.duplicate = function () {
            return new Vector(this.x.duplicate(), this.y.duplicate());
        };
        return Vector;
    }());
    exports.Vector = Vector;
    var Rectangle = /** @class */ (function () {
        function Rectangle(position, width, height) {
            this.position = position;
            this.width = width;
            this.height = height;
        }
        Rectangle.prototype.duplicate = function () {
            return new Rectangle(this.position.duplicate(), this.width, this.height);
        };
        return Rectangle;
    }());
    exports.Rectangle = Rectangle;
});
define("view", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.View = void 0;
    var View = /** @class */ (function () {
        function View(model) {
            this.model = model;
        }
        View.prototype.setController = function (controller) {
            this.controller = controller;
        };
        View.prototype.draw = function () {
        };
        return View;
    }());
    exports.View = View;
    ;
});
define("controller", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Controller = void 0;
    var Controller = /** @class */ (function () {
        function Controller(m, v) {
            m.setController(this);
            v.setController(this);
        }
        // keyboard commands
        Controller.prototype.up = function () {
        };
        Controller.prototype.down = function () {
        };
        Controller.prototype.left = function () {
        };
        Controller.prototype.right = function () {
        };
        // random generator
        Controller.prototype.random = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        return Controller;
    }());
    exports.Controller = Controller;
});
define("model", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Model = exports.Coin = exports.Booster = exports.Bird = exports.Cactus = exports.Hindrance = exports.Balloon = exports.GameObject = void 0;
    var GameObject = /** @class */ (function () {
        function GameObject() {
        }
        return GameObject;
    }());
    exports.GameObject = GameObject;
    ;
    var Balloon = /** @class */ (function (_super) {
        __extends(Balloon, _super);
        function Balloon() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.lives = 3;
            return _this;
        }
        return Balloon;
    }(GameObject));
    exports.Balloon = Balloon;
    ;
    var Hindrance = /** @class */ (function () {
        function Hindrance() {
        }
        return Hindrance;
    }());
    exports.Hindrance = Hindrance;
    ;
    var Cactus = /** @class */ (function (_super) {
        __extends(Cactus, _super);
        function Cactus() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Cactus.prototype.getPower = function () {
            return 1;
        };
        return Cactus;
    }(Hindrance));
    exports.Cactus = Cactus;
    ;
    var Bird = /** @class */ (function (_super) {
        __extends(Bird, _super);
        function Bird() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Bird.prototype.getPower = function () {
            return 2;
        };
        return Bird;
    }(Hindrance));
    exports.Bird = Bird;
    ;
    var Booster = /** @class */ (function () {
        function Booster() {
        }
        return Booster;
    }());
    exports.Booster = Booster;
    ;
    var Coin = /** @class */ (function (_super) {
        __extends(Coin, _super);
        function Coin() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Coin.prototype.getValue = function () {
            return 1;
        };
        return Coin;
    }(Booster));
    exports.Coin = Coin;
    ;
    var Model = /** @class */ (function () {
        function Model() {
            this.balloon = new Balloon();
            this.objects = [];
            this.points = 0;
        }
        Model.prototype.setController = function (c) {
            this.controller = c;
        };
        ;
        return Model;
    }());
    exports.Model = Model;
    ;
});
define("balloonpop", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var State = /** @class */ (function () {
        function State() {
        }
        State.prototype.onKeyDown = function (e) {
            e = e || window.event;
            switch (e.key) {
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
        };
        return State;
    }());
    function wireupGame(document) {
        var state = new State();
        document.gameState = state;
        state.model = new m.Model();
        state.view = new v.View(state.model);
        state.controller = new c.Controller(state.model, state.view);
        var canvas = document.querySelector('canvas');
        var w = canvas.width;
        var h = canvas.height;
        document.addEventListener("keydown", state.onKeyDown);
    }
});
