import { WebDriver, WebElement } from "selenium-webdriver";
import { v4 as uuidv4 } from 'uuid';
import { browser } from "./testingframework";

export class BDD {
    log: any;
    constructor() {
        this.initialSetup();
        //.then(()=>{console.log("Setup initialised...");}).catch((err)=>{ console.log("error in initial setup...", err)});
    }
    private initialSetup(){
        let _browser = new browser();
        _browser.init().then(()=>{console.log("Setup initialised...");}).catch((err)=>{ console.log("error in initial setup...", err)});
        _browser.maximize().then(()=>{console.log("Setup initialised...");}).catch((err)=>{ console.log("error in initial setup...", err)});
    }
    Given(...args) {
       // return new webelement()
        // var identify = generic.identify(args);
        // console.log(identify);
        

    }

    
}

export enum perform {
    "Click" = "$$click$$",
    "Navigate" = "$$go$$",
    "Type" = "$$SendKeys$$",
    "GetText" = "$$GetText$$"
}
export enum condition {
    "Visible" = "__visible__",
    "Equal" = "__Equal__",
    "Not-Visible" = "__Not-Visible__",
    "Enabled" = "__Enabled__",
    "Disabled" = "__Disabled__",
    "WaitTillPageLoads" = "__WaitTillPageLoads__"

}

class generic {
    static identifier: Array<string>; 
    constructor(){
    }
    static identify(args) {
        this.identifier =["className","css","id","js","linkText","name","partialLinkText","tagName","xpath"];
          
        let actionObject = {object: null,action:null,condition:null };
        let _condition =[]
        for (let index = 0; index < args.length; index++) {
            const element = args[index];
            console.log(index, typeof (element), element);
            if(typeof (element) == typeof("")){
                let _matches = element.match(/\bhttps?:\/\/\S+/gi) || element.match(/www?.\S+/gi);
                let _action = element.match(/(?<=\$\$).+?(?=\$\$)/g)
                let _tempCondi = element.match(/(?<=\_\_).+?(?=\_\_)/g);
                if(_tempCondi){_condition.push(_tempCondi);}
                if (_matches) {actionObject['url'] = _matches; }
                if (_action) {actionObject['action'] = _action; }
                if (_condition) {actionObject['condition'] = _condition; }
            } else if(typeof (element) == typeof({})){
                //console.log(typeof (element));
                //if(this.identifier.indexOf(Object.keys[0]) > -1){
                    actionObject["object"] = element;
                //}
                console.log(Object.keys[0]);
            }
            

        }
        return actionObject;

    }

    static execute(driver, object){
        switch (object.action) {
            case "$$click$$":
                
                break;
        
            default:
                break;
        }
    }
}
class webelement {

constructor(_browser: browser){

}
    then(...args) {
        var identify = generic.identify(args);
        console.log(identify);
        return new webelement(null);
    }
    when(...args) {
        return this;
    }

}


