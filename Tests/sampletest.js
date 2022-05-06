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

async function runTestWithCaps() {
    let driver = new webdriver.Builder().withCapabilities({}).forBrowser("chrome").build();
    try {
        await driver.get(env.url);

        await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.home.btnLogin, 10000))).click();
        await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.loginScreen.txtEmail, 10000))).sendKeys(env.username);
        await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.loginScreen.txtPassword, 10000))).sendKeys(env.password);
        await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.loginScreen.btnLogin, 10000))).click();


    } catch (e) {
        //marking the test as Failed if product has not been added to the cart
        console.log("Error:", e.message)
    }
    await driver.quit();
}
runTestWithCaps();