var chai = require('chai');
var assert = chai.assert;

var debug = require('debug');
var debuglog = debug('TEST:common');

var APP_PACKAGE = (process.env['APP_PACKAGE']);
var fleetIdENV = process.env.FLEETID;
var { Given, When, Then } = require('cucumber');

Given(/^I want to open form Arrived and Waiting$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementArrved = await self.client.findElement('id', APP_PACKAGE + ':id/btn_arrived');
    debuglog(`'elementArrved' ${elementArrved}'`)
    await self.client.touchPerform([{ action: 'tap', options: { element: elementArrved.ELEMENT } }]);
    await self.client.setImplicitTimeout(30000);
    var elementAccept = await self.client.findElement('id', APP_PACKAGE + ':id/btn_arrived');
});

Given(/^I want to open form confirm no show booking$/, async function () {
    var self = this;
    self.storage.message = {}
    await self.client.setImplicitTimeout(30000);
    var elementAccept = await self.client.findElement('id', APP_PACKAGE + ':id/fl_no_show');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementAccept.ELEMENT } }])
});

Given(/^I want to click "([^"]*)" button to do no show booking$/, async function (actions) {
    var self = this;
    self.storage.message = {}
    await self.client.setImplicitTimeout(30000);
    var elementYes = await self.client.findElement('id', APP_PACKAGE + ':id/btnYes');
    var elementNo = await self.client.findElement('id', APP_PACKAGE + ':id/btnNo');
    // var data = await self.client.takeScreenshot();
    // self.saveDateScreenshoot(data, '-form-noshow-booking');
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
    if (actions === 'Yes') {
        await self.client.touchPerform([{ action: 'tap', options: { element: elementYes.ELEMENT } }])
    }
    else {
        await self.client.touchPerform([{ action: 'tap', options: { element: elementNo.ELEMENT } }])
    }
});

Given(/^I want to view more booking info$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var elementMoreInfo = await self.client.findElement('id', APP_PACKAGE + ':id/imvUp');
    await self.client.touchPerform([
        { action: 'tap', options: { element: elementMoreInfo.ELEMENT } }
    ]);
});

Given(/^I want to get info airport booking$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var elementTypeRate = await self.client.findElement('id', APP_PACKAGE + ':id/tv_type_rate');
    var elementFlight = await self.client.findElement('id', APP_PACKAGE + ':id/tv_flight_info');
    var textTyperate = await self.client.getElementText(elementTypeRate.ELEMENT);
    var textFlight = await self.client.getElementText(elementFlight.ELEMENT);
    self.storage.messageObject = { typeRate: textTyperate, flightInfo: textFlight };
    // var data = await self.client.takeScreenshot();
    // await self.saveDateScreenshoot(data, '-screen-info-airport-booking');
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Given(/^I want to open form confirm cancel booking by driver$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    await self.client.setImplicitTimeout(30000);
    var elementCancel = await self.client.findElement('id', APP_PACKAGE + ':id/btn_cancel');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementCancel.ELEMENT } }])
});

Given(/^I want to click "([^"]*)" button to do no cancel booking$/, async function (actions) {
    var self = this
    await self.client.setImplicitTimeout(30000);
    var elementYes = await self.client.findElement('id', APP_PACKAGE + ':id/btnYes');
    var elementNo = await self.client.findElement('id', APP_PACKAGE + ':id/btnNo');
    if (actions == 'Yes') {
        await self.client.touchPerform([{ action: 'tap', options: { element: elementYes.ELEMENT } }])
        await self.client.setImplicitTimeout(30000);
        await self.client.findElement('id', APP_PACKAGE + ':id/tv_content_mess');
        // var data = await self.client.takeScreenshot();
        // self.saveDateScreenshoot(data, '-canbooking-not-driver-accpect');
        await self.client.takeScreenshot().then(function (buffer) {
            return self.attach(buffer, 'image/png');
        })
    }
    else {
        await self.client.touchPerform([{ action: 'tap', options: { element: elementNo.ELEMENT } }])
    }
});

Given(/^I want to get massenge confirm pop cancel booking$/, async function () {
    var self = this
    self.storage.message = {}

    await self.client.setImplicitTimeout(30000);
    var elementMessage = await self.client.findElement('id', APP_PACKAGE + ':id/tv_content_mess');
    var textMessage = await self.client.getElementText(elementMessage.ELEMENT)
    var textCancel = await textMessage.slice(textMessage.search('you canceled has'), -1);
    self.storage.message = textCancel;
    // var data = await self.client.takeScreenshot();
    // await self.saveDateScreenshoot(data, '-screen-cancel-booking-no-driver-accepted')
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Given(/^I want to get info top screen of booking status arrived and waiting$/, async function () {
    var self = this;
    var textFare = false;
    var textDes = '';
    var iconNoshow = false;

    await self.client.setImplicitTimeout(30000);
    var elementBook = await self.client.findElement('id', APP_PACKAGE + ':id/tv_book_id');
    var textBook = await self.client.getElementText(elementBook.ELEMENT);
    var elementPickup = await self.client.findElement('id', APP_PACKAGE + ':id/tvPickUp');
    var textPickUp = await self.client.getElementText(elementPickup.ELEMENT);
    var elementDes = await self.client.findElement('id', APP_PACKAGE + ':id/tvDestination');
    if (elementDes.ELEMENT) {
        textDes = await self.client.getElementText(elementDes.ELEMENT);
    };
    var elementFare = await self.client.findElement('id', APP_PACKAGE + ':id/tv_eta_fare_on_top');
    if (elementFare.ELEMENT) {
        var textValue = await self.client.getElementText(elementFare.ELEMENT);
        if (textValue != '') {
            textFare = true
        }
    };
    var elementPayment = await self.client.findElement('id', APP_PACKAGE + ':id/tvPaymentMethodOnTop');
    var textPay = await self.client.getElementText(elementPayment.ELEMENT);
    var elementNoshow = await self.client.findElement('id', APP_PACKAGE + ':id/fl_no_show');
    if (elementNoshow.ELEMENT) {
        iconNoshow = true;
    }
    self.storage.messageObject = {
        pickUp: textPickUp, destination: textDes, iconNoshow: iconNoshow, fare: textFare, paymentType: textPay
    };
    // var screenshoot = await self.client.takeScreenshot();
    // await self.saveDateScreenshoot(screenshoot, '-arrived-waiting-top-screen-' + textBook);
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Given(/^I want to touch button pick-up$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);

    var elementPickup = await self.client.findElement('id', APP_PACKAGE + ':id/btn_arrived');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementPickup.ELEMENT } }]);
});

Given(/^I want to touch button "([^"]*)"$/, async function (mode) {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementYes = await self.client.findElement('id', APP_PACKAGE + ':id/btnYes');
    var elementNo = await self.client.findElement('id', APP_PACKAGE + ':id/btnNo');
    if (mode == 'YES') {
        await self.client.touchPerform([{ action: 'tap', options: { element: elementYes.ELEMENT } }]);
    }
    if (mode == "NO") {
        await self.client.touchPerform([{ action: 'tap', options: { element: elementNo.ELEMENT } }]);
    }
});

Given(/^I want to get message confirmation status Arrived and Wating$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementContent = await self.client.findElement('id', APP_PACKAGE + ':id/tv_content_mess');
    var textContent = await self.client.getElementText(elementContent.ELEMENT);
    self.storage.message = textContent
});

Given(/^I want to open form SOS in screen Arrived and waiting$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementSOS = await self.client.findElement('id', APP_PACKAGE + ':id/tv_sos');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementSOS.ELEMENT } }]);
});

Given(/^I want to get info in form SOS$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementNoti = await self.client.findElement('id', APP_PACKAGE + ':id/btnCallPolice');
    var elementCancel = await self.client.findElement('id', APP_PACKAGE + ':id/btnCancel');
    var textNotify = await self.client.getElementText(elementNoti.ELEMENT);
    var textCancel = await self.client.getElementText(elementCancel.ELEMENT);

    self.storage.messageObject = { buttonNotify: textNotify, buttonCancel: textCancel }
});

