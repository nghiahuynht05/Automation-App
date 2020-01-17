let chai = require('chai');
let assert = chai.assert;

let debug = require('debug');
let debuglog = debug('TEST:common');

let APP_PACKAGE = (process.env['APP_PACKAGE']);
let fleetIdENV = process.env.FLEETID;
let { Given, When, Then } = require('cucumber');


Given(/^I want to open More screen$/, async function () {
    let self = this;

    await self.client.setImplicitTimeout(30000);
    let elementReport = await self.client.findElement('id', APP_PACKAGE + ':id/navigation_more');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementReport.ELEMENT } }]);
});

Given(/^I want to open Profile screen$/, async function () {
    let self = this;

    await self.client.setImplicitTimeout(30000);
    let elementReport = await self.client.findElement('id', APP_PACKAGE + ':id/ctlProfile');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementReport.ELEMENT } }]);
});

Given(/^I want to touch Avatar icon on Profile screen$/, async function () {
    let self = this;

    await self.client.setImplicitTimeout(30000);
    let elementAvt = await self.client.findElement('id', APP_PACKAGE + ':id/imgAvatar');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementAvt.ELEMENT } }]);
});

Given(/^I want to get info form update image$/, async function () {
    let self = this;
    let isTakePhoto = false;
    let isChoosePhoto = false;
    let isCancel = false;

    await self.client.setImplicitTimeout(30000);
    let elementTakePhoto = await self.client.findElement('id', APP_PACKAGE + ':id/btnTakePhoto');
    if (elementTakePhoto.ELEMENT) {
        isTakePhoto = true
    }
    let elementChoosePhoto = await self.client.findElement('id', APP_PACKAGE + ':id/btnLibrary');
    if (elementChoosePhoto.ELEMENT) {
        isChoosePhoto = true
    }
    let elementCancel = await self.client.findElement('id', APP_PACKAGE + ':id/btnCancel');
    if (elementCancel.ELEMENT) {
        isCancel = true
    }
    self.storage.messageObject = {
        TakePhoto: isTakePhoto, ChoosePhoto: isChoosePhoto, Cancel: isCancel
    };
});

Given(/^I want to get info menu on More screen$/, async function () {
    let self = this;
    let isNotification = false;
    let isWallet = false;
    let isReferral = false;
    let isEmergency = false;
    let isSettings = false;
    let isAbout = false;

    await self.client.setImplicitTimeout(30000);
    let elementNotification = await self.client.findElement('id', APP_PACKAGE + ':id/tvNotification');
    if (elementNotification.ELEMENT) {
        isNotification = true
    }
    let elementWallet = await self.client.findElement('id', APP_PACKAGE + ':id/imgWallet');
    if (elementWallet.ELEMENT) {
        isWallet = true
    }
    await self.client.setImplicitTimeout(10000);
    let elementReferral = await self.client.findElement('id', APP_PACKAGE + ':id/tvReferral');
    if (elementReferral.ELEMENT) {
        isReferral = true
    }
    let elementEmergency = await self.client.findElement('id', APP_PACKAGE + ':id/tvEmergency');
    if (elementEmergency.ELEMENT) {
        isEmergency = true
    }
    let elementSettings = await self.client.findElement('id', APP_PACKAGE + ':id/imgSetting');
    if (elementSettings.ELEMENT) {
        isSettings = true
    }
    let elementAbout = await self.client.findElement('id', APP_PACKAGE + ':id/tvAbout');
    if (elementAbout.ELEMENT) {
        isAbout = true
    }
    self.storage.messageObject = {
        Notification: isNotification, Wallet: isWallet, Referral: isReferral, Emergency: isEmergency, Settings: isSettings, About: isAbout
    };
});

Given(/^I want to get info Profile driver$/, async function () {
    let self = this;

    await self.client.setImplicitTimeout(30000);
    let elementName = await self.client.findElement('id', APP_PACKAGE + ':id/tvFullName');
    let textName = await self.client.getElementText(elementName.ELEMENT)
    let elementRating = await self.client.findElement('id', APP_PACKAGE + ':id/tvRate');
    let textRating = await self.client.getElementText(elementRating.ELEMENT)
    let elementPhone = await self.client.findElement('id', APP_PACKAGE + ':id/tvPhone');
    let textPhone = await self.client.getElementText(elementPhone.ELEMENT)
    let elementEmail = await self.client.findElement('id', APP_PACKAGE + ':id/tvEmail');
    let textEmail = await self.client.getElementText(elementEmail.ELEMENT)
    let elementID = await self.client.findElement('id', APP_PACKAGE + ':id/tvNationID');
    let textID = await self.client.getElementText(elementID.ELEMENT)
    let elementAddress = await self.client.findElement('id', APP_PACKAGE + ':id/tvAddress');
    let textAddress = await self.client.getElementText(elementAddress.ELEMENT)
    self.storage.messageObject = {
        DriverName: textName, Rating: textRating, Phone: textPhone, Email: textEmail, NationalIC: textID, Address: textAddress
    };
});

Given(/^I want to open Referral screen$/, async function () {
    let self = this;

    await self.client.setImplicitTimeout(30000);
    let elementReferral = await self.client.findElement('id', APP_PACKAGE + ':id/tvReferral');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementReferral.ELEMENT } }]);
});

Given(/^I want to get info Title screen$/, async function (table) {
    let self = this;
    let expectData = JSON.parse(table.hashes()[0].response);

    await self.client.setImplicitTimeout(30000);
    // let elementTitle = await self.client.findElement('class', 'android.widget.TextView');
    let elementTitle = await self.client.findElement('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.widget.LinearLayout/android.view.View/android.view.View/android.widget.TextView');

    let textTitle = await self.client.getElementText(elementTitle.ELEMENT)
    debuglog("Expect data ", expectData);
    debuglog("this.storage.message ", textTitle);
    assert.isTrue(self.matchData(textTitle, expectData.textTitle), "Result text is not matched with the expected one");
});

Given(/^I want to touch Share button form Refferral$/, async function () {
    let self = this;

    await self.client.setImplicitTimeout(30000);
    let elementShare = await self.client.findElement('id', APP_PACKAGE + ":id/tvShare");
    await self.client.touchPerform([{ action: 'tap', options: { element: elementShare.ELEMENT } }])
});

Given(/^I want to get info confirmation Share Raferral form$/, async function () {
    let self = this;

    await self.client.setImplicitTimeout(30000);
    let elementConfirmation = await self.client.findElement('id', APP_PACKAGE + ":id/tv_content_mess");
    let textConfirmation = await self.client.getElementText(elementConfirmation.ELEMENT);
    self.storage.message = textConfirmation

});
