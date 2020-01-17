var chai = require('chai');
var assert = chai.assert;
var base64Img = require('base64-img');
var moment = require('moment-timezone');
var _ = require('lodash');

var debug = require('debug');
var debuglog = debug('TEST:common');
var fs = require('fs');
var Utils = require("./../../../libs/utils/Utils.js");

var FILE_NAME = (process.env['FILE_NAME']);
var fleetIdENV = process.env.FLEETID
var usernameENV = process.env.USER_NAME
var pwENV = process.env.PASSWORD
var APP_PACKAGE = (process.env['APP_PACKAGE']);

var { Given, When, Then } = require('cucumber');


Given(/^I want to get info booking and payment status DropOff$/, async function () {
    var self = this;
    var bookId = self.storage.returnData.bookId;
    var isBook = false

    await self.client.setImplicitTimeout(30000);
    var elementsBookId = await self.client.findElement('id', APP_PACKAGE + ':id/tvBookId');
    var textBookId = (await self.client.getElementText(elementsBookId.ELEMENT)).substr(1, 9);
    var elementsPayment = await self.client.findElement('id', APP_PACKAGE + ':id/tvPaymentMethod');
    var textPayment = await self.client.getElementText(elementsPayment.ELEMENT);
    if (bookId == textBookId) {
        isBook = true
    }
    self.storage.messageObject = {
        isBook: isBook, Paymenmethod: textPayment
    };
});

Given(/^I want to check show icon sub total$/, async function (table) {
    var self = this;
    var table = table.hashes()[0];
    var icon = false;

    await self.client.setImplicitTimeout(30000);
    var elementsIcon = await self.client.findElement('id', APP_PACKAGE + ':id/imgSubTotal');
    if (elementsIcon.ELEMENT) {
        icon = true
    }
    self.storage.messageObject = {
        iconSubtotal: icon
    };
});

Given(/^I want to get info fare in dropoff booking$/, async function () {
    var self = this;
    var textAirportFee = false;
    var textTollFee = false;
    var textTax = false;
    var textTip = false;
    var textPromo = false;
    var textmeetdriver = false;
    var textTechFee = false;

    await self.client.setImplicitTimeout(30000);
    var elementsAirport = await self.client.findElement('id', APP_PACKAGE + ':id/label_airport_fee');
    if (elementsAirport.ELEMENT) {
        textAirportFee = true
    }
    await self.client.setImplicitTimeout(5000);
    var elementsTollfee = await self.client.findElement('id', APP_PACKAGE + ':id/label_toll_fee');
    if (elementsTollfee.ELEMENT) {
        textTollFee = true
    }
    var elementsTechfee = await self.client.findElement('id', APP_PACKAGE + ':id/label_tech_fee');
    if (elementsTechfee.ELEMENT) {
        textTechFee = true
    }
    var elementsTax = await self.client.findElement('id', APP_PACKAGE + ':id/label_tax');
    if (elementsTax.ELEMENT) {
        textTax = true
    }
    var elementsTip = await self.client.findElement('id', APP_PACKAGE + ':id/label_tip');
    if (elementsTip.ELEMENT) {
        textTip = true
    }
    var elementsPromo = await self.client.findElement('id', APP_PACKAGE + ':id/textView29');
    if (elementsPromo.ELEMENT) {
        textPromo = true
    }
    var elementsTechfee = await self.client.findElement('id', APP_PACKAGE + ':id/label_tech_fee');
    if (elementsTechfee.ELEMENT) {
        textmeetdriver = true
    }
    self.storage.messageObject = {
        textAirportFee: textAirportFee, textTollFee: textTollFee, textTechFee: textTechFee, textTax: textTax, textTip: textTip, textPromo: textPromo, textmeetdriver: textmeetdriver
    };
    // var data = await self.client.takeScreenshot();
    // await self.saveDateScreenshoot(data, '-drop-off-booking')
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Given(/^I want to get info fee in subtotal dropoff booking$/, async function () {
    var self = this;
    var textSurcharge = false;
    var textHeavy = false;
    var textAddl = false;
    var textOther = false;

    await self.client.setImplicitTimeout(30000);
    var elementsSucharge = await self.client.findElement('id', APP_PACKAGE + ':id/tvSurchargeTitle');
    if (elementsSucharge.ELEMENT) {
        textSurcharge = true
    }
    await self.client.setImplicitTimeout(5000);
    var elementsHeavy = await self.client.findElement('id', APP_PACKAGE + ':id/tvHeavyTrafficTitle');
    if (elementsHeavy.ELEMENT) {
        textHeavy = true
    }
    var elementsAddl = await self.client.findElement('id', APP_PACKAGE + ':id/tvAddServicesTitle');
    if (elementsAddl.ELEMENT) {
        textAddl = true
    }
    var elementsOther = await self.client.findElement('id', APP_PACKAGE + ':id/tvOtherFeeTitle');
    if (elementsOther.ELEMENT) {
        textOther = true
    }

    self.storage.messageObject = {
        textSurcharge: textSurcharge, textHeavy: textHeavy, textAddl: textAddl, textOther: textOther
    };
    // var data = await self.client.takeScreenshot();
    // await self.saveDateScreenshoot(data, '-drop-off-booking-subtotal')
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Given(/^I want to get info button Complted booking$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementCompleted = await self.client.findElement('id', APP_PACKAGE + ':id/tvPaymentCompleted');
    var textCompleted = await self.client.getElementText(elementCompleted.ELEMENT);
    self.storage.message = textCompleted
});

Given(/^I want to touch button Completed booking$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementCompleted = await self.client.findElement('id', APP_PACKAGE + ':id/tvPaymentCompleted');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementCompleted.ELEMENT } }]);
});

Given(/^I want to get message confirmation status Completed booking$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementContent = await self.client.findElement('id', APP_PACKAGE + ':id/tv_content_mess');
    var textContent = await self.client.getElementText(elementContent.ELEMENT);
    self.storage.message = textContent
});

Given(/^I want to touch icon subtotal$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementIcon = await self.client.findElement('id', APP_PACKAGE + ':id/imgSubTotal');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementIcon.ELEMENT } }]);
});

Given(/^I want to open form SOS in screen DropOff$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementSOS = await self.client.findElement('id', APP_PACKAGE + ':id/imgSOS');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementSOS.ELEMENT } }]);
});
