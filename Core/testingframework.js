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

    async element(property) {
        this.log.info('find ', property)
        return this.driver.wait(
            this.driver.until.elementIsVisible(
                driver.findElement(property, env.elementwait))).then((element) => {
            this.log.info('Element identified : ', property)
            return element;
        }, (err) => {
            this.log.error('Error on identifying element : ', property)
            return err;
        })
    }

    async click(property, waittime = env.elementwait) {
        return this.driver.wait(until.elementIsVisible(this.driver.findElement(property, waittime))).then(ele => {
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
        return this.driver.wait(until.elementIsVisible(this.driver.findElement(property, waittime))).then(ele => {
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



    SwitchDisplayedFrame = function(object) {
        return new Promise(async(resolve, reject) => {

            let iframe = await driver.findElements(object);
            for (let index = 0; index < iframe.length; index++) {
                const element = iframe[index];
                element.isDisplayed().then(async(status) => {
                    if (status) {
                        console.logstatus, (new Date())
                        await driver.switchTo().frame(element);
                        resolve(status)
                    }
                }).catch(err => { console.log(err) });
            }
            reject(false);
        });
    }
}


module.exports.dvr = class dvr extends WebElementPromise {
    constructor() {

    }

    static jalabula(params) {

    }

}