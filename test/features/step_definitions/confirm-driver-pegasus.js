var chai = require('chai');
var assert = chai.assert;

var debug = require('debug');
var debuglog = debug('TEST:common');

var APP_PACKAGE = (process.env['APP_PACKAGE']);
var fleetIdENV = process.env.FLEETID;
var { Given, When, Then } = require('cucumber');


Given(/^I want to Accepted booking$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementAccept = await self.client.findElement('id', APP_PACKAGE + ':id/imv_avatar');
    debuglog(`'elementAccept' ${elementAccept}'`)
    await self.client.touchPerform([{ action: 'tap', options: { element: elementAccept.ELEMENT } }]);
    await self.client.setImplicitTimeout(30000);
    var elementAccept = await self.client.findElement('id', APP_PACKAGE + ':id/btn_arrived');
});

Given(/^I want to Accepted booking RESERVATION$/, async function (table) {
    var self = this;
    var table = table.hashes()[0];

    await self.client.setImplicitTimeout(30000);
    var elementAccept = await self.client.findElement('id', APP_PACKAGE + ':id/imv_avatar');
    debuglog(`'elementAccept' ${elementAccept}'`)
    await self.client.touchPerform([{ action: 'tap', options: { element: elementAccept.ELEMENT } }]);
    await self.client.setImplicitTimeout(30000);
    var elementMytrips = await self.client.findElement('id', APP_PACKAGE + ':id/navigation_my_trips');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementMytrips.ELEMENT } }]);
    if (table.screenshoot == 'true') {
        // var screenshoot = await self.client.takeScreenshot();
        // await self.saveDateScreenshoot(screenshoot, '-my-trips-booking-reservations-')
        await self.client.takeScreenshot().then(function (buffer) {
            return self.attach(buffer, 'image/png');
        })
    }
});

Given(/^I want to No,thanks booking$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var elementNothanks = await self.client.findElement('id', APP_PACKAGE + ':id/tv_no_thanks');
    debuglog(`'elementNothanks' ${elementNothanks}'`)
    await self.client.touchPerform([{ action: 'tap', options: { element: elementNothanks.ELEMENT } }])
});

Given(/^I want to get info booking in form confirm$/, async function () {
    var self = this;
    var textAddressDO = '';

    await self.client.setImplicitTimeout(30000);
    var elementPickup = await self.client.findElement('id', APP_PACKAGE + ':id/tvPickUp');
    var textAddressPU = await self.client.getElementText(elementPickup.ELEMENT);
    debuglog(`'textAddressPU' ${textAddressPU}`);
    await self.client.setImplicitTimeout(10000);
    var elementDO = await self.client.findElement('id', APP_PACKAGE + ':id/tvDestination');
    if (elementDO.error != 'no such element') {
        textAddressDO = await self.client.getElementText(elementDO.ELEMENT);
        debuglog(`'textAddressDO' ${textAddressDO}`);
    }
    var elementPayment = await self.client.findElement('id', APP_PACKAGE + ':id/tvPaymentMethod');
    var textPayment = await self.client.getElementText(elementPayment.ELEMENT);
    debuglog(`'textPayment' ${textPayment}`);
    var elementTime = await self.client.findElement('id', APP_PACKAGE + ':id/tv_pick_time');
    var textTime = await self.client.getElementText(elementTime.ELEMENT);
    debuglog(`'textTime' ${textTime}`);

    var elementFare = await self.client.findElement('id', APP_PACKAGE + ':id/tv_eta_fare');
    var textFare = '';
    if (elementFare.ELEMENT) {
        textFare = await self.client.getElementText(elementFare.ELEMENT);
        debuglog(`'textFare' ${textFare}`);
    }

    var elementVehicel = await self.client.findElement('id', APP_PACKAGE + ':id/tv_vehicle_type');
    var textVehicel = await self.client.getElementText(elementVehicel.ELEMENT);
    debuglog(`'textVehicel' ${textVehicel}`);

    var elementBookId = await self.client.findElement('id', APP_PACKAGE + ':id/tv_book_id');
    var textBookId = await self.client.getElementText(elementBookId.ELEMENT);
    debuglog(`'textVehicel' ${textVehicel}`);
    self.storage.returnData = { bookId: textBookId };
    // Promise.all([]).then(function () {
    self.storage.messageObject = { pickup: textAddressPU, destination: textAddressDO, pickupTime: textTime, vehicelType: textVehicel, fare: textFare, payment: textPayment };
    // })
});

Given(/^I want to get servic "([^"]*)" in form confirm$/, async function (servic) {
    var self = this;
    self.storage.message = {};

    await self.client.setImplicitTimeout(30000);
    var elementTypeRate = await self.client.findElement('id', APP_PACKAGE + ':id/tv_type_rate');
    var textTypeRate = await self.client.getElementText(elementTypeRate.ELEMENT);
    debuglog(`'textAddress' ${textTypeRate}`);
    if (textTypeRate != '') {
        // var data = await self.client.takeScreenshot();
        // self.saveDateScreenshoot(data, '-service-' + servic);
        await self.client.takeScreenshot().then(function (buffer) {
            return self.attach(buffer, 'image/png');
        })
    }
    self.storage.message = textTypeRate;

});

Given(/^I want to get more info booking in form confirm$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var elementNote = await self.client.findElement('id', APP_PACKAGE + ':id/tvNote');
    var textNote = await self.client.getElementText(elementNote.ELEMENT);
    debuglog(`'textNote' ${textNote}`);
    var elementflight = await self.client.findElement('id', APP_PACKAGE + ':id/tv_flight_info');
    var textFlight = await self.client.getElementText(elementflight.ELEMENT);
    debuglog(`'textFlight' ${textFlight}`);
    var elementAddService = await self.client.findElement('id', APP_PACKAGE + ':id/tvAddServices');
    var textAddService = await self.client.getElementText(elementAddService.ELEMENT);
    debuglog(`'textAddService' ${textAddService}`);
    // var data = await self.client.takeScreenshot();
    // self.saveDateScreenshoot(data, '-confirm-more-info-booking');
    self.storage.messageObject = { notes: textNote, flight: textFlight, additional: textAddService }
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Given(/^I want to open form detail additional service$/, async function () {
    var self = this;

    self.storage.messageObject = {}
    await self.client.setImplicitTimeout(30000);
    var elementIcon = await self.client.findElement('id', APP_PACKAGE + ':id/tvAddServices');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementIcon.ELEMENT } }]);

    await self.client.setImplicitTimeout(30000);
    var elementTitle = await self.client.findElement('id', APP_PACKAGE + ':id/tvTitle');
    var textTitle = await self.client.getElementText(elementTitle.ELEMENT);
    debuglog(`'textTitle' ${textTitle}`);
    var elementNameAdd = await self.client.findElement('id', APP_PACKAGE + ':id/tvServiceName');
    var textNameAdd = await self.client.getElementText(elementNameAdd.ELEMENT);
    debuglog(`'textNameAdd' ${textNameAdd}`);
    var elementValueAdd = await self.client.findElement('id', APP_PACKAGE + ':id/tvServiceFee');
    var textValueAdd = await self.client.getElementText(elementValueAdd.ELEMENT);
    debuglog(`'textValueAdd' ${textValueAdd}`);

    self.storage.messageObject = { title: textTitle, nameadditional: textNameAdd, valueadditional: textValueAdd }
    // var data = await self.client.takeScreenshot();
    // self.saveDateScreenshoot(data, '-confirm-open-additional-service');
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Given(/^I want to swipe down form more info$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var element = await self.client.findElement('id', APP_PACKAGE + ':id/v1');
    var location = await self.client.getElementLocation(element.ELEMENT);
    await self.client.touchPerform([
        { action: 'press', options: { element: element.ELEMENT } },
        { action: 'moveTo', options: { x: location.x, y: location.y + 300 } },
        { action: 'release' }
    ]);
    // var data = await self.client.takeScreenshot();
    // self.saveDateScreenshoot(data, '-confirm-swipe-down');
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Given(/^I want to open form notification driver app$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    await self.client.openNotifications()
});

Given(/^I want to get a content notification cancel booking to driver app$/, async function () {
    var self = this;

    self.storage.message = {}
    await self.client.setImplicitTimeout(30000);
    var elementSummaryView = await self.client.findElement('id', 'com.android.systemui:id/summary_expand_button_view');
    if (elementSummaryView.ELEMENT) {
        await self.client.touchPerform([{ action: 'tap', options: { element: elementSummaryView.ELEMENT } }])
    }

    var elemntNotification = await self.client.findElement('id', 'android:id/big_text');
    if (elemntNotification.error == 'no such element') {
        elemntNotification = await self.client.findElement('id', 'android:id/text');
    }
    var textNotification = await self.client.getElementText(elemntNotification.ELEMENT);
    debuglog(`'textNotification' ${textNotification}`);
    var text = textNotification.slice(textNotification.search('at '));
    debuglog(`'text' ${text}`);
    self.storage.message = text;
    // var data = await self.client.takeScreenshot();
    // self.saveDateScreenshoot(data, '-open-notification');
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
    var elemtclear = await self.client.findElement('id', 'com.android.systemui:id/clear_button');
    if (elemtclear.error == 'no such element') {
        elemtclear = await self.client.findElement('id', 'com.android.systemui:id/clear_all_button');
    }
    await self.client.touchPerform([{ action: 'tap', options: { element: elemtclear.ELEMENT } }])
});

Given(/^I want to get a content notification update destination booking to driver app$/, async function () {
    var self = this;

    self.storage.message = {}
    await self.client.setImplicitTimeout(30000);
    var elementSummaryView = await self.client.findElement('id', 'com.android.systemui:id/summary_expand_button_view');
    if (elementSummaryView.ELEMENT) {
        await self.client.touchPerform([{ action: 'tap', options: { element: elementSummaryView.ELEMENT } }])
    }

    if (self.code == '1') {
        var elemntNotification = await self.client.findElement('id', 'android:id/big_text');
        if (elemntNotification.error == 'no such element') {
            elemntNotification = await self.client.findElement('id', 'android:id/text');
        }
        var textNotification = await self.client.getElementText(elemntNotification.ELEMENT);
        debuglog(`'textNotification' ${textNotification}`);
        var text = textNotification.slice(textNotification.search('The destination'));
        debuglog(`'text' ${text}`);
        self.storage.message = text;
        // var data = await self.client.takeScreenshot();
        // self.saveDateScreenshoot(data, '-open-notification');
        await self.client.takeScreenshot().then(function (buffer) {
            return self.attach(buffer, 'image/png');
        })
        var elemtclear = await self.client.findElement('id', 'com.android.systemui:id/clear_button');
        if (elemtclear.error == 'no such element') {
            elemtclear = await self.client.findElement('id', 'com.android.systemui:id/clear_all_button');
        }
        await self.client.touchPerform([{ action: 'tap', options: { element: elemtclear.ELEMENT } }])
    }
});

Given(/^I want to get a content notification update booking to driver app$/, async function () {
    var self = this;

    self.storage.message = {}
    await self.client.setImplicitTimeout(30000);
    var elementSummaryView = await self.client.findElement('id', 'com.android.systemui:id/summary_expand_button_view');
    if (elementSummaryView.ELEMENT) {
        await self.client.touchPerform([{ action: 'tap', options: { element: elementSummaryView.ELEMENT } }])
    }
    var elemntNotification = await self.client.findElement('id', 'android:id/big_text');
    if (elemntNotification.error == 'no such element') {
        elemntNotification = await self.client.findElement('id', 'android:id/text');
    }
    var textNotification = await self.client.getElementText(elemntNotification.ELEMENT);
    debuglog(`'textNotification' ${textNotification}`);
    var text = textNotification.slice(textNotification.search('has been'));
    debuglog(`'text' ${text}`);
    self.storage.message = text;
    // var data = await self.client.takeScreenshot();
    // self.saveDateScreenshoot(data, '-open-notification');
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
    var elemtclear = await self.client.findElement('id', 'com.android.systemui:id/clear_button');
    if (elemtclear.error == 'no such element') {
        elemtclear = await self.client.findElement('id', 'com.android.systemui:id/clear_all_button');
    }
    await self.client.touchPerform([{ action: 'tap', options: { element: elemtclear.ELEMENT } }])
});

Given(/^Open other open with data$/, async function (table) {
    var self = this;
    var table = table.hashes()[0];

    await self.client.startActivity(table.appPackage, table.appActivity);
});

