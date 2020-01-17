var chai = require('chai');
var assert = chai.assert;
var base64Img = require('base64-img');
var moment = require('moment-timezone');

var debug = require('debug');
var debuglog = debug('TEST:common');
const wdio = require("webdriverio");

var FILE_NAME = (process.env['FILE_NAME']);
var APP_PACKAGE = (process.env['APP_PACKAGE'])

var { Given, When, Then } = require('cucumber');

Given(/^I want to search a country form login with data$/, async function (table) {
    var self = this;
    var table = table.hashes()[0];
    await self.client.setImplicitTimeout(30000);
    var elementWC = await self.client.findElement('id', APP_PACKAGE + ':id/editPhoneWC');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementWC.ELEMENT } }])
    var elementCountry = await self.client.findElement('id', APP_PACKAGE + ':id/tvFlag');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementCountry.ELEMENT } }])
    await self.client.setImplicitTimeout(5000);
    var elementSearch = await self.client.findElement('id', APP_PACKAGE + ':id/search_src_text');
    debuglog(`countryName: '${table.countryName}'`)
    await self.client.setValueImmediate(elementSearch.ELEMENT, table.countryName)
    await self.client.setImplicitTimeout(5000);
    var countryName = await self.client.findElement('id', APP_PACKAGE + ':id/country_name');
    if (countryName.error) {
        self.storage.returnData = ''
        debuglog(`self.stornge.returnData: ''`)
    } else {
        self.storage.returnData = await self.client.getElementText(countryName.ELEMENT);
        debuglog(`self.stornge.returnData: '${self.client.getElementText(countryName.ELEMENT)}'`)
    }
});

Given(/^I want to input phonenumber with data$/, async function (table) {
    var self = this;
    var table = table.hashes()[0];
    await self.client.setImplicitTimeout(30000);
    var elementWC = await self.client.findElement('id', APP_PACKAGE + ':id/editPhoneWC');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementWC.ELEMENT } }])
    var element = await self.client.findElement('id', APP_PACKAGE + table.resourceId);
    debuglog(`findElement: '${element.ELEMENT}'`);
    await self.client.setValueImmediate(element.ELEMENT, table.phoneNumber)
    debuglog(`setValueImmediate: '${table.phoneNumber}'`);
})

Given(/^I want to get tex Login form 1$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var elementWelcome = await self.client.findElement('id', APP_PACKAGE + ':id/tvTitleWelcome')
    var tvTitleWelcome = await self.client.getElementText(elementWelcome.ELEMENT);
    var elementPhoneWC = await self.client.findElement('id', APP_PACKAGE + ':id/editPhoneWC')
    var editPhoneWC = await self.client.getElementText(elementPhoneWC.ELEMENT);
    console.log(tvTitleWelcome, editPhoneWC)
})
