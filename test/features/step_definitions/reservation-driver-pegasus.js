var chai = require('chai');
var assert = chai.assert;

var debug = require('debug');
var debuglog = debug('TEST:common');

var APP_PACKAGE = (process.env['APP_PACKAGE']);
var fleetIdENV = process.env.FLEETID;
var { Given, When, Then } = require('cucumber');


Given(/^I want to get info book top screen$/, async function () {
    var self = this;
    var textFare = false;
    var textDes = '';

    await self.client.setImplicitTimeout(30000);
    var elementBook = await self.client.findElement('id', APP_PACKAGE + ':id/toolbar');
    var textBook = await self.client.getElementText(elementBook.ELEMENT);
    var elementPickup = await self.client.findElement('id', APP_PACKAGE + ':id/tvPickUp');
    var textPickUp = await self.client.getElementText(elementPickup.ELEMENT);
    var elementDes = await self.client.findElement('id', APP_PACKAGE + ':id/tvDestination');
    if (elementDes.ELEMENT) {
        textDes = await self.client.getElementText(elementDes.ELEMENT);
    };
    var elementFare = await self.client.findElement('id', APP_PACKAGE + ':id/tv_eta_fare_on_top');
    if (elementFare.ELEMENT) {
        textValue = await self.client.getElementText(elementFare.ELEMENT);
        if (textValue != '') { }
        textFare = true
    };
    var elementPayment = await self.client.findElement('id', APP_PACKAGE + ':id/tvPaymentMethodOnTop');
    var textPay = await self.client.getElementText(elementPayment.ELEMENT);
    var elementNavigation = await self.client.findElement('id', APP_PACKAGE + ':id/imv_navigation');
    var iconNavigation = false
    if (elementNavigation.ELEMENT) {
        iconNavigation = true
    }
    self.storage.messageObject = {
        pickUp: textPickUp, destination: textDes, iconNavigation: iconNavigation, fare: textFare, paymentType: textPay
    };
    // var screenshoot = await self.client.takeScreenshot();
    // await self.saveDateScreenshoot(screenshoot, '-my-trips-booking-reservations-top-screen-' + textBook);
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Given(/^I want to get info book footer screen$/, async function () {
    var self = this;
    var textNote = '';
    var textPsgName = '';

    await self.client.setImplicitTimeout(30000);
    var elementAdd = await self.client.findElement('id', APP_PACKAGE + ':id/tvAdditionalNew');
    if (elementAdd.ELEMENT) {
        textPsgName = await self.client.getElementText(elementAdd.ELEMENT);
    };
    var elementOnmyway = await self.client.findElement('id', APP_PACKAGE + ':id/btn_arrived');
    var textOnmyway = await self.client.getElementText(elementOnmyway.ELEMENT);
    var elementNote = await self.client.findElement('id', APP_PACKAGE + ':id/tvNoteNew');
    if (elementNote.ELEMENT) {
        textNote = await self.client.getElementText(elementNote.ELEMENT);
    };
    self.storage.messageObject = {
        Addititional: textPsgName, Note: textNote, buttonOnMyWay: textOnmyway
    };
    // var screenshoot = await self.client.takeScreenshot();
    // await self.saveDateScreenshoot(screenshoot, '-my-trips-booking-reservations-footer-screen');
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Given(/^I want to get info booking details$/, async function (table) {
    var self = this;
    var textFlightInfo = '';
    var textService = '';
    var table = table.hashes()[0];

    await self.client.setImplicitTimeout(30000);
    var elementPsgName = await self.client.findElement('id', APP_PACKAGE + ':id/tvPsgName');
    var textPsgName = await self.client.getElementText(elementPsgName.ELEMENT);
    await self.client.setImplicitTimeout(10000);
    var elementFlightInfo = await self.client.findElement('id', APP_PACKAGE + ':id/tv_flight_info');
    if (elementFlightInfo.ELEMENT) {
        textFlightInfo = await self.client.getElementText(elementFlightInfo.ELEMENT);
    };
    await self.client.setImplicitTimeout(10000);
    var elementService = await self.client.findElement('id', APP_PACKAGE + ':id/tv_type_rate');
    if (elementService.ELEMENT) {
        textService = await self.client.getElementText(elementService.ELEMENT);
    };
    var elementVehicel = await self.client.findElement('id', APP_PACKAGE + ':id/tv_vehicle_type');
    var textvehicel = await self.client.getElementText(elementVehicel.ELEMENT);
    var elementCall = await self.client.findElement('id', APP_PACKAGE + ':id/btn_call_operator');
    var textCall = await self.client.getElementText(elementCall.ELEMENT);
    var elementCancel = await self.client.findElement('id', APP_PACKAGE + ':id/btn_cancel');
    var textCancel = await self.client.getElementText(elementCancel.ELEMENT);

    self.storage.messageObject = {
        PsgName: textPsgName, VehicelType: textvehicel, CallOperator: textCall, Cancel: textCancel, FlightInfo: textFlightInfo, Service: textService
    };
    if (table.screenshoot == 'true') {
        // var screenshoot = await self.client.takeScreenshot();
        // await self.saveDateScreenshoot(screenshoot, '-my-trips-booking-reservations-booking-details');
        await self.client.takeScreenshot().then(function (buffer) {
            return self.attach(buffer, 'image/png');
        })
    }
});

Given(/^I want to swipe up action open booking detail$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementSwipe = await self.client.findElement('id', APP_PACKAGE + ':id/imvUp');
    await self.client.touchPerform([{
        action: 'tap', options: { element: elementSwipe.ELEMENT }
    }]);
})

Given(/^I want to touch acctions Call from booking details$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementCall = await self.client.findElement('id', APP_PACKAGE + ':id/btn_call_operator');
    await self.client.touchPerform([
        { action: 'tap', options: { element: elementCall.ELEMENT } },
    ]);
    var elemtPhone = await self.client.findElement('id', 'com.samsung.android.dialer:id/digits');
    if (elemtPhone.error == 'no such element') {
        elemtPhone = await self.client.findElement('id', 'com.android.contacts:id/digits');
    }
    var textPhone = await self.client.getElementText(elemtPhone.ELEMENT);
    self.storage.message = textPhone;
    // var screenshoot = await self.client.takeScreenshot();
    // await self.saveDateScreenshoot(screenshoot, '-my-trips-booking-reservations-call-operator');
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
})