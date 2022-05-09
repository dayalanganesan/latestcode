const webdriver = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const env = require('../env.json');
const screenObject = require('../ObjectRepository/ObjectRepo.json');
var logger = require('logger');
const { v4: uuidv4 } = require('uuid');

// Input capabilities
const capabilities = {
    'device': 'iPhone 11',
    'realMobile': 'true',
    'os_version': '14.0',
    'browserName': 'iphone',
    'name': 'BStack-[NodeJS] Sample Test', // test name
    'build': 'BStack Build Number 1' // CI/CD job or build name
}
module.exports.browser = class browser {
    constructor() {
        this.log = logger.createLogger('././TestReports/logs/' + uuidv4() + '.log'); // logs to a file
        this.log.info('loading an array', [1, 2, 3], 'now!');

    }
    init() {
        this.driver = new webdriver.Builder()
            .withCapabilities({})
            .forBrowser("chrome").build();
    }

    async navigate(url) {
        await driver.get(url);
    }

    async element(property) {
        return driver.wait(webdriver.until.elementIsVisible(driver.findElement(property, (+env.elementwait * 1000)))).then(element => {
            return element;
        }).catch(err => {
            return err;
        })
    }

    element(orPath) {

    }
}