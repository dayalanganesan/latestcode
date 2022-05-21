const webdriver = require('selenium-webdriver');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const env = require('../env.json');
const screenObject = require('../ObjectRepository/ObjectRepo.json');
var logger = require('logger');
const { v4: uuidv4 } = require('uuid');
const { WebElementPromise } = require('selenium-webdriver');
const { promise } = require('selenium-webdriver');
const { WebElement } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const chromium = require('selenium-webdriver/chromium');
const edge = require('selenium-webdriver/edge');
const ie = require('selenium-webdriver/ie');
const { Timeouts } = require('selenium-webdriver/lib/capabilities');
const { ServiceBuilder } = require('selenium-webdriver/chrome');





module.exports.browser = class browser {
    constructor() {
        this.log = logger.createLogger('././TestReports/logs/' + uuidv4() + '.log'); // logs to a file
        this.log.info('Started....');

    }
    browserOptions(args = null) {


        switch (env.browser) {
            case "chrome":
                this.options = new chrome.Options();
                break;
            case "chromium":
                this.options = new chromium.Options();
                break;
            case "firefox":
                this.options = new firefox.Options();
                break;
            case "ie":
                this.options = new ie.Options();
                break;
            case "edge":
                this.options = new edge.Options();
                break;
            default:
                this.options = new chrome.Options();
                break;
        }

        if (args == null)
            return this.options;

        this.options.addArguments(args);
        return this.options;
    }

    async maximize() {
        await this.driver.manage().window().maximize();
    }

    async init() {
        this.log.info('init started')
        try {
            if (!this.options)
                this.browserOptions();

            switch (env.browser) {
                case "chrome":
                    this.driver = new webdriver.Builder().forBrowser("chrome").setChromeOptions(this.options).build();
                    break;
                case "chromium":
                    this.driver = new webdriver.Builder().forBrowser("chromium").setChromeOptions(this.options).build();
                    break;
                case "firefox":
                    this.driver = new webdriver.Builder().forBrowser("firefox").setFirefoxOptions(this.options).build();
                    break;
                case "ie":
                    this.driver = new webdriver.Builder().forBrowser("ie").setIeOptions(this.options).build();
                    break;
                case "edge":
                    this.driver = new webdriver.Builder().forBrowser("edge").setEdgeOptions(this.options).build();
                    break;
                default:
                    this.driver = new webdriver.Builder().forBrowser("chrome").setChromeOptions(this.options).build();
                    break;
            }
            await this.driver.manage().setTimeouts(env.timeout);
        } catch (e) {
            this.log.error('error in init', e);
        }

    }

    async navigate(url) {
        try {
            await this.driver.get(url);
        } catch (e) {
            this.log.error('error in navigate url', e);
        }

    }

    // async element(property) {
    //     return 
    //         this.driver.wait(until.elementIsVisible(
    //             this.driver.findElement(property), env.elementwait)).then((element) => {
    //             this.log.info('Element identified : ', property)
    //             return element;
    //         }, (err) => {
    //             this.log.error('Error on identifying element : ', property)
    //             return err;
    //         })
    //     }

    async click(property, waittime = 0) {
        waittime = waittime == 0 ? env.elementwait : waittime;
        return this.driver.wait(until.elementLocated(property, waittime)).then(ele => {
            this.log.info('Element identified : ', property);
            try {
                ele.click();
                return ele;
            } catch (e) {
                this.log.error('Error on clicking element : ', property, e)
                return e;
            }

        }).catch(err => {
            this.log.error('Error on identifying element : ', property, err)
            return err;
        })
    }
    async sendKeys(property, value, waittime = env.elementwait) {
        return this.driver.wait(until.elementIsEnabled(this.driver.findElement(property), waittime)).then(ele => {
            this.log.info('Element identified : ', property);
            try {
                ele.sendKeys(value);
                return ele;
            } catch (e) {
                this.log.error('Error on typing element : ', property, e)
                return e;
            }

        }).catch(err => {
            this.log.error('Error on identifying element : ', property, err)
            return err;
        })
    }
    async quit() {
        return this.driver.quit().then(() => {
            this.log.info('Driver closed successfully')
            return true;
        }).catch(e => {
            this.log.info('Error closing driver', e)
            return false;
        });
    }
    async switchDefault() {
        await this.driver.switchTo().defaultContent();
    }
    async switchFrame(identifier) {
        this.log.info("Switch frame called..");
        try {
            let count = 0;
            let counter = 0;
            while (count = 0 || counter < 100) {
                this.log.info("Frame identification started");
                let frame = await this.driver.findElements(identifier);
                this.log.info(frame.length);
                counter++;
                if (frame.length > 0) {
                    this.log.info("number of frames identified :", frame.length);
                    for (let index = 0; index < frame.length; index++) {
                        const element = frame[index];
                        let isdisplayed = await element.isDisplayed();
                        let isEnabled = await element.isEnabled();
                        this.log.info(isEnabled, isdisplayed);

                        if (isEnabled) {
                            this.log.info("displayed frame :", await element.getAttribute("name"));
                            this.driver.switchTo().frame(element);
                            this.log.info("Switched to frame");
                            count = 1;
                            counter = 101;
                            break;
                        }
                    }
                }

            }
        } catch (e) {
            this.log.error("error while switching frame", e);
        }
    }
}

class webelementextension {
    constructor(driver) {
        this.driver = driver;
    }

}
//     SwitchDisplayedFrame = function(object) {
//         return new Promise(async(resolve, reject) => {

//             let iframe = await driver.findElements(object);
//             for (let index = 0; index < iframe.length; index++) {
//                 const element = iframe[index];
//                 element.isDisplayed().then(async(status) => {
//                     if (status) {
//                         console.logstatus, (new Date())
//                         await driver.switchTo().frame(element);
//                         resolve(status)
//                     }
//                 }).catch(err => { console.log(err) });
//             }
//             reject(false);
//         });
//     }

//     test() {
//         return
//     }
// }


// module.exports.bdd = class bdd {
//     constructor() {
//         this.log = logger.createLogger('././TestReports/logs/' + uuidv4() + '.log'); // logs to a file
//         this.log.info('Started....');
//     }
//     Given(...args) {
//         this.log.info(args);
//         return new browserelement(this.log, null, null)
//     }
// };
// class browserelement {
//     constructor(logger, driver, element) {
//         this.log = logger;
//         this.driver = driver;
//         this.parentelement = element;
//     }
//     then(...args) {
//         this.log.info(args);
//         return new browserelement(this.log, null, null)
//     }
//     when(...args) {
//         this.log.info(args);
//         return new browserelement(this.log, null, null)
//     }

// }