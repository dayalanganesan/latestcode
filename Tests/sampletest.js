const webdriver = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const env = require('../env.json');
const screenObject = require('../ObjectRepository/ObjectRepo.json');
const web = require('../Core/testingframework.js');
const chrome = require('selenium-webdriver/chrome');

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


    var options = new chrome.Options();
    options.addArguments("--incognito");
    options.addArguments("--disable-extensions");
    let driver = new webdriver.Builder().forBrowser("chrome").setChromeOptions(options).build();
    await driver.manage().window().maximize();
    await driver.get(env.url);
    await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.home.btnLogin, 10000))).click();
    await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.loginScreen.txtEmail, 10000))).sendKeys(env.username);
    await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.loginScreen.txtPassword, 10000))).sendKeys(env.password);
    await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.loginScreen.btnLogin, 10000))).click();
    //switch to frame using web element
    await driver.sleep(10000);
    let ifrCnt = 0
    while (ifrCnt < 20) {
        console.log(new Date())
        try {
            driver.findElements(screenObject.homeScreen.ifrHomeScreen).then(iframe => {
                if (iframe.length > 0) { ifrCnt = 20 }
            })
            ifrCnt = ifrCnt + 1
            await driver.sleep(10000);
        } catch (e) {
            console.log("Error:", e.message)
        }
    }

    await driver.sleep(4000);
    await driver.wait(webdriver.until.elementIsEnabled(driver.findElement(screenObject.homeScreen.ifrHomeScreen, 20000)))
    await driver.switchTo().frame(driver.findElement(screenObject.homeScreen.ifrHomeScreen));

    await driver.wait(webdriver.until.elementIsEnabled(driver.findElement(screenObject.homeScreen.btnaddaproperty, 15000))).click();
    await driver.sleep(4000);
    await driver.switchTo().defaultContent();

    await SwitchDisplayedFrame(screenObject.homeScreen.ifrHomeScreen);


    await driver.wait(webdriver.until.elementLocated(driver.findElement(screenObject.addPropertyScreen.txtPropertyAddress, 10000))).sendKeys("107 Esplanade , Rockingham WA 6168");
    await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.addPropertyScreen.drpSaleType, 10000))).sendKeys("Private Treaty");
    await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.addPropertyScreen.drpContractofSale, 10000))).sendKeys("No");
    await driver.wait(webdriver.until.elementIsVisible(driver.findElement(screenObject.addPropertyScreen.btnGetStarted, 10000))).click();

    await driver.quit();
}

async function frameworkCode() {
    var driver = new web.browser();
    driver.browserOptions(["--incognito", "--disable-extensions"])
    await driver.init();
    await driver.maximize();
    await driver.navigate(env.url);
    await driver.click(screenObject.home.btnLogin, 30000);
    await driver.sendKeys(screenObject.loginScreen.txtEmail, env.username, 30000);
    await driver.sendKeys(screenObject.loginScreen.txtPassword, env.password, 30000);
    driver.click(screenObject.loginScreen.btnLogin);
    //await driver.quit();
}
frameworkCode();