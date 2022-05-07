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
    await driver.manage().window().maximize();
    try {
        await driver.get(env.url);
        await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.home.btnLogin, 10000))).click();
        await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.loginScreen.txtEmail, 10000))).sendKeys(env.username);
        await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.loginScreen.txtPassword, 10000))).sendKeys(env.password);
        await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.loginScreen.btnLogin, 10000))).click();
        //switch to frame using web element
        await driver.sleep(15000);
        //await driver.wait(webdriver.until.elementLocated(driver.findElement(screenObject.homeScreen.ifrHomeScreen, 20000)))
        await driver.switchTo().frame(driver.findElement(screenObject.homeScreen.ifrHomeScreen));

        await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.homeScreen.btnaddaproperty, 15000))).then(ele => {
            ele.click();
        }).catch(async(ele) => {

            await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.homeScreen.btnaddaproperty, 2000))).click();
        })
        await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.addPropertyScreen.txtPropertyAddress, 10000))).sendKeys("107 Esplanade , Rockingham WA 6168");
        await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.addPropertyScreen.drpSaleType, 10000))).sendKeys("Private Treaty");
        await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.addPropertyScreen.drpContractofSale, 10000))).sendKeys("No");
        await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.addPropertyScreen.btnGetStarted, 10000))).click();

    } catch (e) {
        //marking the test as Failed if product has not been added to the cart
        console.log("Error:", e.message)
    }
    // await driver.quit();
}
runTestWithCaps();