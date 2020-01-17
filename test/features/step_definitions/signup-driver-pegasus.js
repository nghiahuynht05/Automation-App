var chai = require('chai');
var assert = chai.assert;

var debug = require('debug');
var debuglog = debug('TEST:common');
const wdio = require("webdriverio");

var FILE_NAME = (process.env['FILE_NAME']);
var APP_PACKAGE = (process.env['APP_PACKAGE'])

var { Given, When, Then } = require('cucumber');

Given(/^I want to open signup pages$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementSignup = await self.client.findElement('id', APP_PACKAGE + ':id/actionSignUp');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementSignup.ELEMENT } }]);
});

Given(/^Test case$/, async function () {
    var self = this;
    var elementchrome = await self.client.findElement('id', 'com.android.chrome:id/toolbar');
    if (elementchrome.ELEMENT) {
        var driver = await self.client.switchContext('WEBVIEW_sbrowser');
        var context = await driver.context('WEBVIEW_sbrowser')
    }
})