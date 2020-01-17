var chai = require('chai');
var assert = chai.assert;
var base64Img = require('base64-img');
var moment = require('moment-timezone');
var async = require('async')

var debug = require('debug');
var debuglog = debug('TEST:common');
const wdio = require("webdriverio");

var FILE_NAME = (process.env['FILE_NAME']);
var APP_PACKAGE = (process.env['APP_PACKAGE'])

var { Given, When, Then } = require('cucumber');


Given('I clear view', async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var listAutoFill = await self.client.findElement('id', 'android:id/autofill_dataset_list');
    var value = await listAutoFill.getText();
    debuglog(`value: ${value}`);
    var suggetPhone = await self.client.findElement('id', '	android:id/content');
    await suggetPhone.click();

});


Given(/^I want to input phone number form login with data$/, async function (table) {
    var self = this;
    var table = table.hashes()[0];
    await self.client.setImplicitTimeout(30000);
    var emlementPhone = await self.client.findElement('id', APP_PACKAGE + ':id/editPhone');
    await self.client.setValueImmediate(emlementPhone.ELEMENT, table.phoneNumber);
    debuglog(`setValueImmediate: '${table.phoneNumber}'`);

    // var emlementPhone = await self.client.$("android.widget.EditText");
    // await emlementPhone.setValue(table.phoneNumber);
    if (table.password) {
        await self.client.setImplicitTimeout(30000);
        var emlementPassword = await self.client.findElement('id', APP_PACKAGE + ':id/editPassword')
        await self.client.setValueImmediate(emlementPassword.ELEMENT, table.password);
    }
});

Given(/^I want to input data login form with$/, async function (table) {
    var self = this;
    var table = table.hashes()[0];

    await self.client.setImplicitTimeout(30000);
    var emlementUser = await self.client.findElement('id', APP_PACKAGE + ':id/editUserName');
    var emlementPassword = await self.client.findElement('id', APP_PACKAGE + ':id/editPassword');
    await self.client.setValueImmediate(emlementUser.ELEMENT, table.userName);
    await self.client.setValueImmediate(emlementPassword.ELEMENT, table.password);
    debuglog(`setValueImmediate: '${table.userName}' '${table.password}'`);
});


Given('I want to tap checkbox term of use', async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    // var elementCheck = await self.client.findElement('id', APP_PACKAGE + ':id/cbTerm');
    // await self.client.touchPerform([{ action: 'tap', options: { element: elementCheck.ELEMENT } }]);
    var elementCheck = await self.client.$('android.widget.CheckBox');
    await elementCheck.click();

    debuglog(`touchPerform: '${elementCheck.ELEMENT}'`);
});

When(/^I want to tap button Accept form login$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var button = await self.client.findElement('id', APP_PACKAGE + ':id/btnContinue');
    await self.client.touchPerform([{ action: 'tap', options: { element: button.ELEMENT } }])
    debuglog(`touchPerform: '${button.ELEMENT}'`);
});

When(/^I want to tap button Yes form login$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var button = await self.client.findElement('id', APP_PACKAGE + ':id/btnYes');
    await self.client.touchPerform([{ action: 'tap', options: { element: button.ELEMENT } }])
    debuglog(`touchPerform: '${button.ELEMENT}'`);
});

When(/^I want to tap forgot password$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var button = await self.client.findElement('id', APP_PACKAGE + ':id/tvForgotPassword');
    await self.client.touchPerform([{ action: 'tap', options: { element: button.ELEMENT } }])
    debuglog(`touchPerform: '${button.ELEMENT}'`);
});

Then(/^I want to get message forgot password$/, async function () {
    var self = this;
    self.storage.message = {}
    await self.client.setImplicitTimeout(30000);
    var elementContent = await self.client.findElement('id', APP_PACKAGE + ':id/tv_content_mess');
    var textContent = await self.client.getElementText(elementContent.ELEMENT)
    self.storage.message = textContent
});

Then(/^I want to get message error login$/, async function () {
    var self = this;
    self.storage.message = {}
    await self.client.setImplicitTimeout(30000);
    var elementContent = await self.client.findElement('id', APP_PACKAGE + ':id/tv_content_mess');
    var textContent = await self.client.getElementText(elementContent.ELEMENT)
    self.storage.message = textContent
    // var data = await self.client.takeScreenshot();
    // await self.saveDateScreenshoot(data, '-message-error-login')
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

When(/^I want to get message error$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var toastElement = await self.client.findElement('xpath', '/hierarchy/android.widget.Toast');
    var toastMessage = await self.client.getElementText(toastElement.ELEMENT);
    debuglog(`toastMessage:' ${toastMessage}'`);
    self.storage.message = toastMessage;
    // var data = await self.client.takeScreenshot();
    // await self.saveDateScreenshoot(data, '-message-error')
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Then(/^I should get the response message matches with language$/, function (table, callback) {
    var self = this;
    var expectData = JSON.parse(table.hashes()[0].response);
    debuglog("Expect data ", expectData.en);
    debuglog("this.storage.message ", self.storage.message);

    switch (process.env['LANGUAGE_DEVICE']) {
        case 'fr':
            assert.isTrue(self.storage.message === expectData.fr, "Result object is not matched with the expected one");
            break;
        default:
            assert.isTrue(self.storage.message === expectData.en, "Result object is not matched with the expected one");
    }
    callback()
});

Then(/^I should open form verify code and send data$/, async function (table) {
    var self = this;
    var table = table.hashes()[0];
    await self.client.setImplicitTimeout(30000);
    var element = await self.client.findElement('id', APP_PACKAGE + ':id/edtCode');
    await self.client.setValueImmediate(element.ELEMENT, table.verifyCode)
    await self.client.setImplicitTimeout(30000);
});

Then(/^I should open Home form$/, async function () {
    var self = this;
    self.client.setImplicitTimeout(30000);
    var element = await self.client.findElement('id', APP_PACKAGE + ':id/navigation_home');
    var isEnable = await self.client.isElementEnabled(element.ELEMENT);
    assert.isTrue(isEnable === true, "Result status home is not matched with the expected one");
});

When(/^I want to get all text in login form$/, async function () {
    var self = this;
    this.storage.textEdits = [];
    this.storage.textViews = [];
    await self.client.setImplicitTimeout(5000);
    var textViews = await self.client.findElements('class name', 'android.widget.TextView');
    var textEdits = await self.client.findElements('class name', 'android.widget.EditText');
    for (var i = 0; i < textViews.length; i++) {
        var toastMessage = await self.client.getElementText(textViews[i].ELEMENT);
        if (toastMessage != '') {
            self.storage.textViews.push(toastMessage);
            debuglog(`toastMessage :' ${i} ${toastMessage}'`);
        }
    }
    for (var i = 0; i < textEdits.length; i++) {
        var toastMessage = await self.client.getElementText(textEdits[i].ELEMENT);
        if (toastMessage != '') {
            self.storage.textEdits.push(toastMessage);
            debuglog(`toastMessage :' ${i} ${toastMessage}'`);
        }
    }
});

Given(/^I want to logout driver app$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    await self.client.touchPerform([{ action: 'tap', options: { element: (await self.client.findElement('id', APP_PACKAGE + ':id/navigation_more')).ELEMENT } }])
    await self.client.touchPerform([{ action: 'tap', options: { element: (await self.client.findElement('id', APP_PACKAGE + ':id/ctlProfile')).ELEMENT } }])
    await self.client.touchPerform([{ action: 'tap', options: { element: (await self.client.findElement('id', APP_PACKAGE + ':id/actionLogOut')).ELEMENT } }])
    await self.client.setImplicitTimeout(30000);
    await self.client.findElement('id', APP_PACKAGE + ':id/cbTerm');
})

Then(/^I should get text home form matches with$/, async function (table) {
    var self = this;
    var table = table.hashes()[0];
    var a = ["What's your number?", "+84", "Term(s) of Use & Privacy Policy.", "Mobile number", ""];
    var b = { "title": "What's your number?", "countrycode": "+84", "termofuse": "Term(s) of Use & Privacy Policy.", "phone": "Mobile number", "confirm": "" }
    assert.isTrue(self.matchData(a, b), "Result object is not matched with the expected one")
});

Given(/^I want to change server test in driver app with data$/, async function (table) {
    var self = this;
    var table = table.hashes()[0];

    await self.client.setImplicitTimeout(30000);
    var element = await self.client.findElement('id', APP_PACKAGE + ':id/toolbar')
    await self.client.touchPerform([
        { action: 'press', options: { element: element.ELEMENT } },
    ]);
    await self.client.setImplicitTimeout(10000);
    var elementCode = await self.client.findElement('id', APP_PACKAGE + ':id/edtPassCode');
    await self.client.setValueImmediate(elementCode.ELEMENT, '7620');
    var elementYes = await self.client.findElement('id', 'android:id/button1');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementYes.ELEMENT } }])
    await self.client.setImplicitTimeout(30000);
    var elementFleet = await self.client.findElement('id', APP_PACKAGE + ':id/edtFleetId');
    await self.client.setValueImmediate(elementFleet.ELEMENT, table.fleetCode);
    await self.client.hideKeyboard();
    var elementApply = await self.client.findElement('id', APP_PACKAGE + ':id/btnApply');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementApply.ELEMENT } }]);
});

Given(/^I want to clear data phonenumber in login form$/, async function () {
    var self = this;

    self.client.setImplicitTimeout(30000);
    var elementPhone = await self.client.findElement('id', APP_PACKAGE + ':id/editPhone')
    await self.client.elementClear(elementPhone.ELEMENT)
});

Given(/^I want to clear data username in login form$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementPhone = await self.client.findElement('id', APP_PACKAGE + ':id/editUserName')
    await self.client.elementClear(elementPhone.ELEMENT)
});

Given(/^I want to change country code$/, async function (table) {
    var self = this;
    var table = table.hashes()[0];

    await self.client.setImplicitTimeout(30000);
    var elementCountry = await self.client.findElement('id', APP_PACKAGE + ':id/tvFlag')
    await self.client.touchPerform([{ action: 'tap', options: { element: elementCountry.ELEMENT } }]);
    var elementSearch = await self.client.findElement('id', APP_PACKAGE + ':id/search_src_text');
    await self.client.setValueImmediate(elementSearch, table.countryName);
    var elementResult = await self.client.findElement('id', APP_PACKAGE + ':id/country_name');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementResult.ELEMENT } }]);
});

