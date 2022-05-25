const webdriver = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const env = require('../env.json');
const screenObject = require('../ObjectRepository/ObjectRepo.json');
const web = require('../Core/testingframework.js');
const chrome = require('selenium-webdriver/chrome');
const { BDD } = require('../Core/SeleniumDriver');
const { perform, condition } = require('../Core/SeleniumDriver');
const async= require('async');


async function smoketestingtc() {
//To test login & Activity Tab

var driver = new web.browser();
driver.browserOptions(["--incognito", "--disable-extensions"])
    await driver.init();
    await driver.maximize();
    await driver.navigate(env.url);
    await driver.click(screenObject.home.btnLogin, 2000);
    await driver.sleep(2000);
    await driver.sendKeys(screenObject.loginScreen.txtPassword, env.password);
    await driver.sendKeys(screenObject.loginScreen.txtEmail, env.username);
    await driver.click(screenObject.loginScreen.btnLogin);
    await driver.sleep(5000);
    await driver.quit();
//To Test Team menu
    var driver = new web.browser();
    driver.browserOptions(["--incognito", "--disable-extensions"])
    await driver.init();
    await driver.maximize();
    await driver.navigate(env.url);
    await driver.click(screenObject.home.btnLogin, 2000);
    await driver.sleep(2000);
    await driver.sendKeys(screenObject.loginScreen.txtPassword, env.password);
    await driver.sendKeys(screenObject.loginScreen.txtEmail, env.username);
    await driver.click(screenObject.loginScreen.btnLogin);
    await driver.sleep(5000);
    await (await driver.switchFrame(screenObject.homeScreen.ifrHomeScreen)).readyStateWait(5)
    await driver.click(screenObject.activityTabList.teamTab);
    await driver.sleep(7000);
    await driver.quit();

//To test Documents tabs
    var driver = new web.browser();
    driver.browserOptions(["--incognito", "--disable-extensions"])
    await driver.init();
    await driver.maximize();
    await driver.navigate(env.url);
    await driver.click(screenObject.home.btnLogin, 15000);
    await driver.sleep(5000);
    await driver.sendKeys(screenObject.loginScreen.txtPassword, env.password);
    await driver.sendKeys(screenObject.loginScreen.txtEmail, env.username);
    await driver.click(screenObject.loginScreen.btnLogin);
    await driver.sleep(5000);
    await (await driver.switchFrame(screenObject.homeScreen.ifrHomeScreen)).readyStateWait(2)
    await driver.sleep(5000);
    await driver.click(screenObject.activityTabList.documentsTab);
    await driver.sleep(8000);
    await driver.quit();

// To test Guidance Menu
    var driver = new web.browser();
    driver.browserOptions(["--incognito", "--disable-extensions"])
    await driver.init();
    await driver.maximize();
    await driver.navigate(env.url);
    await driver.click(screenObject.home.btnLogin, 15000);
    await driver.sleep(5000);
    await driver.sendKeys(screenObject.loginScreen.txtPassword, env.password);
    await driver.sendKeys(screenObject.loginScreen.txtEmail, env.username);
    await driver.click(screenObject.loginScreen.btnLogin);
    await driver.sleep(3000);
    await driver.switchDefault();
    await driver.click(screenObject.homeMenuList.guidanceMenu);
    await driver.sleep(5000);
    await driver.quit();

//To test Profile Menu
    var driver = new web.browser();
    driver.browserOptions(["--incognito", "--disable-extensions"])
    await driver.init();
    await driver.maximize();
    await driver.navigate(env.url);
    await driver.click(screenObject.home.btnLogin, 15000);
    await driver.sleep(5000);
    await driver.sendKeys(screenObject.loginScreen.txtPassword, env.password);
    await driver.sendKeys(screenObject.loginScreen.txtEmail, env.username);
    await driver.click(screenObject.loginScreen.btnLogin);
    await driver.sleep(3000);   
    await driver.switchDefault();
    await driver.sleep(3000);
    await driver.click(screenObject.homeMenuList.profileMenu);
    await driver.sleep(3000);
    await driver.quit();

// To test logoff
var driver = new web.browser();
driver.browserOptions(["--incognito", "--disable-extensions"])
await driver.init();
await driver.maximize();
await driver.navigate(env.url);
await driver.click(screenObject.home.btnLogin, 15000);
await driver.sleep(5000);
await driver.sendKeys(screenObject.loginScreen.txtPassword, env.password);
await driver.sendKeys(screenObject.loginScreen.txtEmail, env.username);
await driver.click(screenObject.loginScreen.btnLogin);
await driver.sleep(3000);
await driver.click(screenObject.homeMenuList.logoffMenu);
await driver.sleep(3000);
await driver.quit();


}

smoketestingtc()

