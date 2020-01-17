var chai = require('chai');
var assert = chai.assert;

var debug = require('debug');
var debuglog = debug('TEST:common');

var APP_PACKAGE = (process.env['APP_PACKAGE']);
var fleetIdENV = process.env.FLEETID;
var { Given, When, Then } = require('cucumber');

Given(/^I want to get info customer in booking$/, async function () {
    var self = this;
    self.storage.returnData = {};
    self.storage.messageObject = {}

    await self.client.setImplicitTimeout(30000);
    var elementPsg = await self.client.findElement('id', APP_PACKAGE + ':id/tvPsgName');
    var textPsg = await self.client.getElementText(elementPsg.ELEMENT);
    var elementBookId = await self.client.findElement('id', APP_PACKAGE + ':id/tv_book_id');
    var textBookId = await self.client.getElementText(elementBookId.ELEMENT);
    self.storage.returnData = { bookId: textBookId };
    self.storage.messageObject = { namePsg: textPsg };
    // var data = await self.client.takeScreenshot();
    // await self.saveDateScreenshoot(data, '-screen-info-custome-in-booking-' + textBookId)
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Given(/^I want to get info top screen of booking status POB$/, async function () {
    var self = this;
    var textFare = false;
    var textDes = '';
    var iconNav = false;
    var iconEdit = false;

    await self.client.setImplicitTimeout(30000);
    var elementBook = await self.client.findElement('id', APP_PACKAGE + ':id/tv_book_id');
    var textBook = await self.client.getElementText(elementBook.ELEMENT);
    var elementDes = await self.client.findElement('id', APP_PACKAGE + ':id/tvDestination');
    if (elementDes.ELEMENT) {
        textDes = await self.client.getElementText(elementDes.ELEMENT);
    };
    await self.client.setImplicitTimeout(10000);
    var elementIconEdit = await self.client.findElement('id', APP_PACKAGE + ':id/imvEditDestination');
    if (elementIconEdit.ELEMENT) {
        iconEdit = true
    }
    await self.client.setImplicitTimeout(10000);
    var elementFare = await self.client.findElement('id', APP_PACKAGE + ':id/tv_eta_fare_on_top');
    if (elementFare.ELEMENT) {
        var textValue = await self.client.getElementText(elementFare.ELEMENT);
        if (textValue != '') {
            textFare = true
        }
    };
    var elementPayment = await self.client.findElement('id', APP_PACKAGE + ':id/tvPaymentMethodOnTop');
    var textPay = await self.client.getElementText(elementPayment.ELEMENT);
    var elementNav = await self.client.findElement('id', APP_PACKAGE + ':id/imv_navigation');
    if (elementNav.ELEMENT) {
        iconNav = true;
    }
    self.storage.messageObject = {
        destination: textDes, iconEdit: iconEdit, iconNavigation: iconNav, fare: textFare, paymentType: textPay
    };
    // var screenshoot = await self.client.takeScreenshot();
    // await self.saveDateScreenshoot(screenshoot, '-POB-top-screen-' + textBook);
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Given(/^I want to get info footer screen of booking status POB$/, async function () {
    var self = this;
    var textNote = '';
    var textAdd = '';

    await self.client.setImplicitTimeout(30000);
    var elementAdd = await self.client.findElement('id', APP_PACKAGE + ':id/tvAdditionalNew');
    if (elementAdd.ELEMENT) {
        textAdd = await self.client.getElementText(elementAdd.ELEMENT);
    };
    var elementOnmyway = await self.client.findElement('id', APP_PACKAGE + ':id/btn_arrived');
    var textOnmyway = await self.client.getElementText(elementOnmyway.ELEMENT);
    var elementNote = await self.client.findElement('id', APP_PACKAGE + ':id/tvNoteNew');
    if (elementNote.ELEMENT) {
        textNote = await self.client.getElementText(elementNote.ELEMENT);
    };
    self.storage.messageObject = {
        Addititional: textAdd, Note: textNote, buttonOnMyWay: textOnmyway
    };
    // var screenshoot = await self.client.takeScreenshot();
    // await self.saveDateScreenshoot(screenshoot, '-POB-footer-screen-');
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Given(/^I want to get info booking status POB$/, async function (table) {
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

    self.storage.messageObject = {
        PsgName: textPsgName, VehicelType: textvehicel, FlightInfo: textFlightInfo, Service: textService
    };
    if (table.screenshoot == 'true') {
        // var screenshoot = await self.client.takeScreenshot();
        // await self.saveDateScreenshoot(screenshoot, '-POB-details');
        await self.client.takeScreenshot().then(function (buffer) {
            return self.attach(buffer, 'image/png');
        })
    }
});

Given(/^I want to touch button Drop-off$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);

    var elementPickup = await self.client.findElement('id', APP_PACKAGE + ':id/btn_arrived');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementPickup.ELEMENT } }]);
});
Given(/^I want to get message confirmation status Drop-off$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementContent = await self.client.findElement('id', APP_PACKAGE + ':id/tv_content_mess');
    var textContent = await self.client.getElementText(elementContent.ELEMENT);
    self.storage.message = textContent
});

Given(/^I want to get info button Drop-off$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementArrived = await self.client.findElement('id', APP_PACKAGE + ':id/tvPaymentCompleted');
    var textArrived = await self.client.getElementText(elementArrived.ELEMENT);
    self.storage.message = textArrived;
});

Given(/^I want to get message incident booking by CC$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementContent = await self.client.findElement('id', APP_PACKAGE + ':id/tv_content_mess');
    var textContent = await self.client.getElementText(elementContent.ELEMENT);
    self.storage.message = textContent
});

Given(/^I want to open form SOS in screen POB$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementSOS = await self.client.findElement('id', APP_PACKAGE + ':id/tv_sos');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementSOS.ELEMENT } }]);
});
