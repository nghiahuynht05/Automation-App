var chai = require('chai');
var assert = chai.assert;

var debug = require('debug');
var debuglog = debug('TEST:common');

var APP_PACKAGE = (process.env['APP_PACKAGE']);
var fleetIdENV = process.env.FLEETID;
var { Given, When, Then } = require('cucumber');


Given(/^I want to open Report screen$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementReport = await self.client.findElement('id', APP_PACKAGE + ':id/navigation_reports');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementReport.ELEMENT } }]);
});

Given(/^I want to open Earning form$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementNext = await self.client.findElement('id', APP_PACKAGE + ':id/imgNext');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementNext.ELEMENT } }]);
});

Given(/^I want to open form tooltip info Earning form$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementIcon = await self.client.findElement('id', APP_PACKAGE + ':id/actionInfo');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementIcon.ELEMENT } }]);
});

Given(/^I want to open Calendar form$/, async function () {
    let self = this;

    await self.client.setImplicitTimeout(30000);
    let elementCalendar = await self.client.findElement('id', APP_PACKAGE + ':id/imgCalendar');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementCalendar.ELEMENT } }]);
});

Given(/^I want to select "([^"]*)" range$/, async function (time) {
    let self = this;

    await self.client.setImplicitTimeout(30000);
    if (time == "Weekly") {
        let elementWeekly = await self.client.findElement('id', APP_PACKAGE + ':id/btnWeekly');
        await self.client.touchPerform([{ action: 'tap', options: { element: elementWeekly.ELEMENT } }]);
    }
    if (time == "Monthly") {
        let elementMonthly = await self.client.findElement('id', APP_PACKAGE + ':id/btnMonthly');
        await self.client.touchPerform([{ action: 'tap', options: { element: elementMonthly.ELEMENT } }]);
    }
    if (time == "Custom") {
        let elementCustom = await self.client.findElement('id', APP_PACKAGE + ':id/btnCustom');
        await self.client.touchPerform([{ action: 'tap', options: { element: elementCustom.ELEMENT } }]);
    }
});

Given(/^I want to open Booking detail screen$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementBookingDetail = await self.client.findElement('id', APP_PACKAGE + ':id/tvBookingDetail');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementBookingDetail.ELEMENT } }]);
});

Given(/^I want to open Receipts screen$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementReceipts = await self.client.findElement('id', APP_PACKAGE + ':id/tvReceipt');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementReceipts.ELEMENT } }]);
});

Given(/^I want to open Referrails screen$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementReferrals = await self.client.findElement('id', APP_PACKAGE + ':id/tvReferral');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementReferrals.ELEMENT } }]);
});

Given(/^I want to show report by this weekly$/, async function () {
    let self = this;

    await self.client.setImplicitTimeout(30000);
    let elementTime = await self.client.findElement('xpath', '//b.c[@content-desc="This week"]/android.widget.TextView');
    if (elementTime.ELEMENT) {
        await self.client.takeScreenshot().then(function (buffer) {
            return self.attach(buffer, 'image/png');
        })
    }
});

Given(/^I want to show report by this month$/, async function () {
    let self = this;

    await self.client.setImplicitTimeout(30000);
    let elementTime = await self.client.findElement('xpath', '//b.c[@content-desc="This month"]/android.widget.TextView');
    if (elementTime.ELEMENT) {
        await self.client.takeScreenshot().then(function (buffer) {
            return self.attach(buffer, 'image/png');
        })
    }
});

Given(/^I want to get info in Earning form$/, async function () {
    let self = this;

    await self.client.setImplicitTimeout(30000);
    let elementRide = await self.client.findElement('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.widget.FrameLayout/android.view.View/android.widget.ScrollView/android.view.View/android.widget.TextView[1]');
    let TextRides = await self.client.getElementText(elementRide.ELEMENT)
    let elementRidePayment = await self.client.findElement('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.widget.FrameLayout/android.view.View/android.widget.ScrollView/android.view.View/android.widget.TextView[3]');
    let TextRidePayment = await self.client.getElementText(elementRidePayment.ELEMENT)
    let elementOnBoard = await self.client.findElement('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.widget.FrameLayout/android.view.View/android.widget.ScrollView/android.view.View/android.widget.TextView[5]');
    let TextOnBoard = await self.client.getElementText(elementOnBoard.ELEMENT)
    let elementReceived = await self.client.findElement('id', APP_PACKAGE + ':id/tvTitleCash');
    let TextReceived = await self.client.getElementText(elementReceived.ELEMENT)
    let elementDeductions = await self.client.findElement('id', APP_PACKAGE + ':id/tvTitleDeduc');
    let TextDeductions = await self.client.getElementText(elementDeductions.ELEMENT)
    let elementNetEarnings = await self.client.findElement('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.widget.FrameLayout/android.view.View/android.widget.ScrollView/android.view.View/android.widget.TextView[11]');
    let TextNetEarnings = await self.client.getElementText(elementNetEarnings.ELEMENT)
    let elementGrossEarning = await self.client.findElement('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.widget.FrameLayout/android.view.View/android.widget.ScrollView/android.view.View/android.widget.TextView[13]');
    let TextGrossEarning = await self.client.getElementText(elementGrossEarning.ELEMENT)
    let elementReferral = await self.client.findElement('id', APP_PACKAGE + ':id/tvTitleReferral');
    let TextReferral = await self.client.getElementText(elementReferral.ELEMENT)
    let elementTips = await self.client.findElement('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.widget.FrameLayout/android.view.View/android.widget.ScrollView/android.view.View/android.widget.TextView[17]');
    let TextTips = await self.client.getElementText(elementTips.ELEMENT)
    let elementTotal = await self.client.findElement('id', APP_PACKAGE + ':id/tvTitleTotalEarning');
    let Texttotal = await self.client.getElementText(elementTotal.ELEMENT)
    self.storage.messageObject = {
        TotalRide: TextRides, TotalRidePayment: TextRidePayment, TipsOnBoard: TextOnBoard, CashReceived: TextReceived, DriverDeductions: TextDeductions, NetEarnings: TextNetEarnings, GrossEarnings: TextGrossEarning, ReferralEarning: TextReferral, TipsAfterRide: TextTips, TotalEarning: Texttotal
    };
});

Given(/^I want to get info in tooltip Earning form$/, async function () {
    let self = this;

    await self.client.setImplicitTimeout(30000);
    let elementNet = await self.client.findElement('id', APP_PACKAGE + ':id/tvTitleDescriptionNet');
    let TextNet = await self.client.getElementText(elementNet.ELEMENT)
    let elementGross = await self.client.findElement('id', APP_PACKAGE + ':id/tvTitleDescriptionGross');
    let TextGross = await self.client.getElementText(elementGross.ELEMENT)
    let elementReferral = await self.client.findElement('id', APP_PACKAGE + ':id/tvTitleDescriptionReferral');
    let TextReferral = await self.client.getElementText(elementReferral.ELEMENT)
    self.storage.messageObject = {
        NetEarnings: TextNet, GrossEarnings: TextGross, ReferralEarning: TextReferral
    };
})
