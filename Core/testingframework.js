import { Driver } from 'selenium-webdriver/chrome';

const webdriver = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const env = require('../env.json');
const screenObject = require('../ObjectRepository/ObjectRepo.json');
// Input capabilities
const capabilities = {
    'device': 'iPhone 11',
    'realMobile': 'true',
    'os_version': '14.0',
    'browserName': 'iphone',
    'name': 'BStack-[NodeJS] Sample Test', // test name
    'build': 'BStack Build Number 1' // CI/CD job or build name
}
export class browser {
    constructor() {}
    init() {
        this.driver = new webdriver.Builder()
            .withCapabilities({})
            .forBrowser("chrome").build();
    }

    async navigate(url) {
        await driver.get(url);
    }

    async waitForElementVisible() {
        return driver.wait(webdriver.until.elementLocated(screenObject.home.btnLogin, 10000)).then(element => {
            return element;
        })
    }
}