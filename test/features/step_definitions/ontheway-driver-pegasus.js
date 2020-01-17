var chai = require('chai');
var assert = chai.assert;

var debug = require('debug');
var debuglog = debug('TEST:common');

var APP_PACKAGE = (process.env['APP_PACKAGE']);
var fleetIdENV = process.env.FLEETID;
var { Given, When, Then } = require('cucumber');

Given(/^I want to get info top screen of booking status on the way$/, async function () {
    var self = this;
    var textFare = false;
    var textDes = '';
    var iconPromo = false;

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
        if (textValue) {
            textFare = true
        }
    };
    var elementPromo = await self.client.findElement('id', APP_PACKAGE + ':id/tv_eta_fare_on_top');
    if (elementPromo.ELEMENT) {
        iconPromo = true;
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
    // await self.saveDateScreenshoot(screenshoot, '-on-the-way-top-screen-' + textBook);
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Given(/^I want to get info footer screen of booking status on the way$/, async function () {
    var self = this;
    var textNote = '';
    var textAdd = '';

    await self.client.setImplicitTimeout(30000);
    var elementAdd = await self.client.findElement('id', APP_PACKAGE + ':id/tvAdditionalNew');
    if (elementAdd.ELEMENT) {
        textAdd = await self.client.getElementText(elementAdd.ELEMENT);
    };
    var elementCall = await self.client.findElement('id', APP_PACKAGE + ':id/btn_call');
    var textCall = await self.client.getElementText(elementCall.ELEMENT);
    var elementOnmyway = await self.client.findElement('id', APP_PACKAGE + ':id/btn_arrived');
    var textOnmyway = await self.client.getElementText(elementOnmyway.ELEMENT);
    var elementNote = await self.client.findElement('id', APP_PACKAGE + ':id/tvNoteNew');
    if (elementNote.ELEMENT) {
        textNote = await self.client.getElementText(elementNote.ELEMENT);
    };
    self.storage.messageObject = {
        Addititional: textAdd, Note: textNote, buttonCall: textCall, buttonOnMyWay: textOnmyway
    };
    // var screenshoot = await self.client.takeScreenshot();
    // await self.saveDateScreenshoot(screenshoot, '-on-the-way-footer-screen-');
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Given(/^I want to open form navigation map$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementNav = await self.client.findElement('id', APP_PACKAGE + ':id/imv_navigation');
    await self.client.touchPerform([{
        action: 'tap', options: { element: elementNav.ELEMENT }
    }]);
});

Given(/^I want to get info form navigation map$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementGG = await self.client.findElement('id', APP_PACKAGE + ':id/btnGoogle');
    var textNav = await self.client.getElementText(elementGG.ELEMENT);
    var elementCancel = await self.client.findElement('id', APP_PACKAGE + ':id/btnCancel');
    var textCancel = await self.client.getElementText(elementCancel.ELEMENT);

    self.storage.messageObject = { buttonMap: textNav, buttonCancel: textCancel }
});

Given(/^I want to get info details booking$/, async function (table) {
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
    var elementPU = await self.client.findElement('id', APP_PACKAGE + ':id/tv_pick_time');
    var textPU = await self.client.getElementText(elementPU.ELEMENT);
    var elementCancel = await self.client.findElement('id', APP_PACKAGE + ':id/btn_cancel');
    var textCancel = await self.client.getElementText(elementCancel.ELEMENT);

    self.storage.messageObject = {
        PsgName: textPsgName, Service: textService, VehicelType: textvehicel, PickupTime: textPU, FlightInfo: textFlightInfo, Cancel: textCancel
    };
    if (table.screenshoot == 'true') {
        // var screenshoot = await self.client.takeScreenshot();
        // await self.saveDateScreenshoot(screenshoot, '-detail-booking-' + table.statusBooking);
        await self.client.takeScreenshot().then(function (buffer) {
            return self.attach(buffer, 'image/png');
        })
    }
});

Given(/^I want to touch button Call$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementCall = await self.client.findElement('id', APP_PACKAGE + ':id/btn_call');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementCall.ELEMENT } }]);
    var elemtPhone = await self.client.findElement('id', 'com.samsung.android.dialer:id/digits');
    if (elemtPhone.error == 'no such element') {
        elemtPhone = await self.client.findElement('id', 'com.android.contacts:id/digits');
    }
    var textPhone = await self.client.getElementText(elemtPhone.ELEMENT);
    self.storage.message = textPhone;
    // var screenshoot = await self.client.takeScreenshot();
    // await self.saveDateScreenshoot(screenshoot, '-driver-on-the-way-call-passenger');
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Given(/^I want to get info booking status Driver on the way$/, async function (table) {
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
    var elementCancel = await self.client.findElement('id', APP_PACKAGE + ':id/btn_cancel');
    var textCancel = await self.client.getElementText(elementCancel.ELEMENT);

    self.storage.messageObject = {
        PsgName: textPsgName, VehicelType: textvehicel, Cancel: textCancel, FlightInfo: textFlightInfo, Service: textService
    };
    if (table.screenshoot == 'true') {
        // var screenshoot = await self.client.takeScreenshot();
        // await self.saveDateScreenshoot(screenshoot, '-driver-onthe-way-details');
        await self.client.takeScreenshot().then(function (buffer) {
            return self.attach(buffer, 'image/png');
        })
    }
});

Given(/^I want to get info button Arrived$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementArrived = await self.client.findElement('id', APP_PACKAGE + ':id/btn_arrived');
    var textArrived = await self.client.getElementText(elementArrived.ELEMENT);
    self.storage.message = textArrived;
});