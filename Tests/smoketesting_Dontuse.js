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

//Reusabel function for Navigatoin
async function naviagation_resuable(){

    var driver = new web.browser();
    driver.browserOptions(["--incognito", "--disable-extensions"])
    await driver.init();
    await driver.maximize();
    await driver.navigate(env.url);
    await driver.click(screenObject.home.btnLogin, 2000);
    await driver.sleep(2000);
    return driver;
}

//Resuable funtion for Login & Activity Menu
async function loginactivity_resuable(driver){

    await driver.sendKeys(screenObject.loginScreen.txtPassword, env.password);
    await driver.sendKeys(screenObject.loginScreen.txtEmail, env.username);
    await driver.click(screenObject.loginScreen.btnLogin);
    await driver.sleep(5000);
}

//Resuable funtion for Team Menu
async function teammenu_resuable(driver){


    await (await driver.switchFrame(screenObject.homeScreen.ifrHomeScreen)).readyStateWait(5)
    await driver.click(screenObject.activityTabList.teamTab);
    await driver.switchDefault();
}

//Resuable funtion for Document Menu
async function documentmenu_resuable(driver){

    await (await driver.switchFrame(screenObject.homeScreen.ifrHomeScreen)).readyStateWait(2)
    await driver.sleep(1000);
    await driver.click(screenObject.activityTabList.documentsTab);
    await driver.sleep(1000);
}

//Resuable funtion for Guidance Menu
async function guidancemenu_resuable(driver){

    await driver.switchDefault();
    await driver.click(screenObject.homeMenuList.guidanceMenu);
    await driver.sleep(5000);
}

//Resuable funtion for Profile Menu
async function guidancemenu_resuable(driver){

    await driver.sendKeys(screenObject.loginScreen.txtPassword, env.password);
    await driver.sendKeys(screenObject.loginScreen.txtEmail, env.username);
    await driver.click(screenObject.loginScreen.btnLogin);
    await driver.sleep(3000);
    await driver.switchDefault();
    await driver.click(screenObject.homeMenuList.guidanceMenu);
    await driver.sleep(5000);
}

//Resuable funtion for Loggoff
async function logoff_resuable(driver){

await driver.sendKeys(screenObject.loginScreen.txtPassword, env.password);
await driver.sendKeys(screenObject.loginScreen.txtEmail, env.username);
await driver.click(screenObject.loginScreen.btnLogin);
await driver.sleep(3000);
await driver.click(screenObject.homeMenuList.logoffMenu);
await driver.sleep(3000);
}

//To test Login & Activity Menu
async function loginactivity() {
    var driver = await naviagation_resuable();
    await loginactivity_resuable(driver);
    await driver.quit();   
}

//To test Team menu
async function teammenu() {
    var driver = await naviagation_resuable();
    await teammenu_resuable(driver);
    await driver.quit();   
}

//To test Document menu
async function documentmenu() {
    var driver = await naviagation_resuable();
    await documentmenu_resuable(driver);
    await driver.quit();   
}


async function document_tab_verfication(){

    // Open browser url
    //Login
    //Click Document
    var driver = await naviagation_resuable();
    await loginactivity_resuable(driver);
    await (await driver.switchFrame(screenObject.homeScreen.ifrHomeScreen)).readyStateWait(2)
    await driver.sleep(1000);
    await driver.click(screenObject.activityTabList.documentsTab);
    await driver.sleep(1000);
    await driver.quit();
}

async function activity_tab_verfication(){

    // Open browser url
    //Login
    //Click Document
    var driver = await naviagation_resuable();
    await loginactivity_resuable(driver);
    await (await driver.switchFrame(screenObject.homeScreen.ifrHomeScreen)).readyStateWait(2)
    await driver.sleep(1000);
    await driver.click(screenObject.activityTabList.activityTab);
    await driver.sleep(1000);
    await driver.quit();
}

await document_tab_verfication();
//await activity_tab_verfication();




