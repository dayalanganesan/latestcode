"use strict";
exports.__esModule = true;
exports.condition = exports.perform = exports.BDD = void 0;
var BDD = /** @class */ (function () {
    function BDD() {
        this.initialSetup();
        //.then(()=>{console.log("Setup initialised...");}).catch((err)=>{ console.log("error in initial setup...", err)});
    }
    BDD.prototype.initialSetup = function () {
        // let _browser = new browser();
        // _browser.init().then(()=>{console.log("Setup initialised...");}).catch((err)=>{ console.log("error in initial setup...", err)});
        // _browser.maximize().then(()=>{console.log("Setup initialised...");}).catch((err)=>{ console.log("error in initial setup...", err)});
    };
    BDD.prototype.Given = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // return new webelement()
        // var identify = generic.identify(args);
        // console.log(identify);
        return new webelement(null);
    };
    return BDD;
}());
exports.BDD = BDD;
var perform;
(function (perform) {
    perform["Click"] = "$$click$$";
    perform["Navigate"] = "$$go$$";
    perform["Type"] = "$$SendKeys$$";
    perform["GetText"] = "$$GetText$$";
})(perform = exports.perform || (exports.perform = {}));
var condition;
(function (condition) {
    condition["Visible"] = "__visible__";
    condition["Equal"] = "__Equal__";
    condition["Not-Visible"] = "__Not-Visible__";
    condition["Enabled"] = "__Enabled__";
    condition["Disabled"] = "__Disabled__";
    condition["WaitTillPageLoads"] = "__WaitTillPageLoads__";
})(condition = exports.condition || (exports.condition = {}));
var generic = /** @class */ (function () {
    function generic() {
    }
    generic.identify = function (args) {
        this.identifier = ["className", "css", "id", "js", "linkText", "name", "partialLinkText", "tagName", "xpath"];
        var actionObject = { object: null, action: null, condition: null };
        var _condition = [];
        for (var index = 0; index < args.length; index++) {
            var element = args[index];
            console.log(index, typeof (element), element);
            if (typeof (element) == typeof ("")) {
                var _matches = element.match(/\bhttps?:\/\/\S+/gi) || element.match(/www?.\S+/gi);
                var _action = element.match(/(?<=\$\$).+?(?=\$\$)/g);
                var _tempCondi = element.match(/(?<=\_\_).+?(?=\_\_)/g);
                if (_tempCondi) {
                    _condition.push(_tempCondi);
                }
                if (_matches) {
                    actionObject['url'] = _matches;
                }
                if (_action) {
                    actionObject['action'] = _action;
                }
                if (_condition) {
                    actionObject['condition'] = _condition;
                }
            }
            else if (typeof (element) == typeof ({})) {
                //console.log(typeof (element));
                //if(this.identifier.indexOf(Object.keys[0]) > -1){
                actionObject["object"] = element;
                //}
                console.log(Object.keys[0]);
            }
        }
        return actionObject;
    };
    return generic;
}());
var webelement = /** @class */ (function () {
    // constructor(driver: WebDriver, element: WebElement, action: string = "",condition:any[] = [],  value: string = "") {
    //     this.driver = driver;
    //     this.parentElement = element;
    //     this.action = action;
    //     this.value = value;
    //     this.condition = condition;
    // }
    function webelement(_browser) {
    }
    webelement.prototype.then = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var identify = generic.identify(args);
        console.log(identify);
        return new webelement(null);
    };
    webelement.prototype.when = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this;
    };
    return webelement;
}());
