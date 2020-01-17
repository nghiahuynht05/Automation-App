var chai = require('chai');
var assert = chai.assert;

var debug = require('debug');
var debuglog = debug('TEST:common');

var APP_PACKAGE = (process.env['APP_PACKAGE'])

var { Given, When, Then } = require('cucumber');

Given(/^I want to get message warning topup balance$/, async function () {
    var self = this;
    self.storage.message = {}
    await self.client.setImplicitTimeout(30000);
    var elementMessage = await self.client.findElement('id', APP_PACKAGE + ':id/tv_content_mess');
    var textMessage = await self.client.getElementText(elementMessage.ELEMENT);
    debuglog(`textMessage:' ${textMessage}'`);
    self.storage.message = textMessage
});

Given(/^I want to close form warning balance$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var elementClose = await self.client.findElement('id', APP_PACKAGE + ':id/btnNo');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementClose.ELEMENT } }])
})

Given(/^I want to open form topup driver$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var elementClose = await self.client.findElement('id', APP_PACKAGE + ':id/btnYes');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementClose.ELEMENT } }])
})

Given(/^I want to swith status available$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var elementTouch = await self.client.findElement('id', APP_PACKAGE + ':id/switchActive')
    await self.client.touchPerform([{ action: 'tap', options: { element: elementTouch.ELEMENT } }])
    // await self.client.setImplicitTimeout(5000);
    var elementStatus = await self.client.findElement('id', APP_PACKAGE + ':id/tv_status')
    var textStatus = await self.client.getElementText(elementStatus.ELEMENT);
    debuglog(`textStatus:' ${textStatus}'`);
    self.storage.message = textStatus
});

Given(/^I want to show banner in driver$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var elementBanner = await self.client.findElement('id', APP_PACKAGE + ':id/imv_banner');
    if (elementBanner.error != 'no such element') {
        // var data = await self.client.takeScreenshot();
        // self.saveDateScreenshoot(data, '-show-banner-appdriver')
        await self.client.takeScreenshot().then(function (buffer) {
            return self.attach(buffer, 'image/png');
        })
    }
})

Given(/^I want to hide banner in driver$/, async function () {
    var self = this;
    self.client.setImplicitTimeout(30000);
    var element = await self.client.findElement('id', APP_PACKAGE + ':id/navigation_home');
    var isEnable = await self.client.isElementEnabled(element.ELEMENT);
    if (isEnable) {
        // var data = await self.client.takeScreenshot();
        // self.saveDateScreenshoot(data, '-hide-banner-appdriver')
        await self.client.takeScreenshot().then(function (buffer) {
            return self.attach(buffer, 'image/png');
        })
    }
})

Given(/^I want to get info earnings todays of driver$/, async function () {
    var self = this;
    self.storage.message = {};

    await self.client.setImplicitTimeout(30000);
    var elemntValue = await self.client.findElement('id', APP_PACKAGE + ':id/tvTripsMoney');
    var textValue = await self.client.getElementText(elemntValue.ELEMENT);
    debuglog(`textValue:' ${textValue}'`);
    var elemntName = await self.client.findElement('id', APP_PACKAGE + ':id/tvTripCount');
    var textName = await self.client.getElementText(elemntName.ELEMENT);
    debuglog(`textName:' ${textName}'`);
    if (textValue != '') {
        self.storage.messageObject = { value: textValue, name: textName }
        self.storage.message = textName
    }
    else {
        self.storage.message = "Don't get earnings today driver"
    }
});

Given(/^I want to get info driver's cartype and license number$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var elementVehicel = await self.client.findElement('id', APP_PACKAGE + ':id/tvCardType');
    var textVehicel = await self.client.getElementText(elementVehicel.ELEMENT);
    var elementLicense = await self.client.findElement('id', APP_PACKAGE + ':id/tvLicenseNumber');
    var textLicense = await self.client.getElementText(elementLicense.ELEMENT);
    if (textVehicel != '' && textLicense != '') {
        self.storage.messageObject = { vehicleType: textVehicel, licenseNumber: textLicense }
    }

})

Then(/^I should get the object response message matches with$/, function (table, callback) {
    var self = this;
    var expectData = JSON.parse(table.hashes()[0].response);
    debuglog("Expect data ", expectData);
    debuglog("this.storage.message ", self.storage.messageObject);
    assert.isTrue(self.matchData(self.storage.messageObject, expectData), "Result object is not matched with the expected one");
    callback()
});

Then(/^Waiting open driver app succesfull$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var elementOK = await self.client.findElement('id', APP_PACKAGE + ':id/btnOK')
    if (elementOK.ELEMENT) {
        await self.client.touchPerform([{ action: 'tap', options: { element: elementOK.ELEMENT } }])
    }
    var element = await self.client.findElement('id', APP_PACKAGE + ':id/navigation_home');
    var isEnable = await self.client.isElementEnabled(element.ELEMENT);
    self.storage.isStatus = isEnable
    assert.isTrue(isEnable == true, "Result status home is not matched with the expected one");
});

Given(/^I want to open rating form$/, async function () {
    var self = this;
    if (self.storage.isStatus) {
        var element = await self.client.findElement('id', APP_PACKAGE + ':id/imgArrow')
        var location = await self.client.getElementLocation(element.ELEMENT);
        await self.client.touchPerform([
            { action: 'press', options: { element: element.ELEMENT } },
            { action: 'moveTo', options: { x: location.x, y: location.y - 300 } },
            { action: 'release' }
        ])
    }
})

When(/^I want to get info acceptance ratings and cancellation form rating$/, async function () {
    var self = this;

    var elementAccepetance = await self.client.findElement('id', APP_PACKAGE + ':id/tvAcceptance');
    var accepetance = await self.client.getElementText(elementAccepetance.ELEMENT)
    var elementRating = await self.client.findElement('id', APP_PACKAGE + ':id/tvRating');
    var ratings = await self.client.getElementText(elementRating.ELEMENT)
    var elementCancel = await self.client.findElement('id', APP_PACKAGE + ':id/tvCancellation');
    var cancellation = await self.client.getElementText(elementCancel.ELEMENT)
    self.storage.messageObject = {
        accepetance: accepetance,
        ratings: ratings,
        cancellation: cancellation,
    }
})

Given(/^I would to open My Trips form$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementTrip = await self.client.findElement('id', APP_PACKAGE + ':id/navigation_my_trips');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementTrip.ELEMENT } }])
})

Given(/^I want to get status booking form my trips$/, async function () {
    var self = this;

    self.storage.message = {};
    await self.client.setImplicitTimeout(30000);
    var elementStatusBook = await self.client.findElement('id', APP_PACKAGE + ':id/tvStatus');
    var textStatus = await self.client.getElementText(elementStatusBook.ELEMENT);
    // var data = await self.client.takeScreenshot();
    // self.saveDateScreenshoot(data, '-mytrips-booking')
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
    self.storage.message = textStatus
});

Given(/^I want to open form license plate$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementLicense = await self.client.findElement('id', APP_PACKAGE + ':id/tvCardType');
    self.client.touchPerform([{ action: 'tap', options: { element: elementLicense.ELEMENT } }])
});

Given(/^I want to select the license plate "([^"]*)" in list$/, async function (item) {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementItem = await self.client.findElement('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.widget.FrameLayout/android.view.View/androidx.recyclerview.widget.RecyclerView/android.view.View[2]');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementItem.ELEMENT } }])
    var textItem = await self.client.getElementText(elementItem.ELEMENT);
    self.storage.message = textItem
});

Given(/^I want to save setting license plate$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementSave = await self.client.findElement('id', APP_PACKAGE + ':id/actionSave');
    self.client.touchPerform([{ action: 'tap', options: { element: elementSave.ELEMENT } }]);
});

Given(/^I want to search license plate with data$/, async function (table) {
    var self = this;
    var table = table.hashes()[0];

    await self.client.setImplicitTimeout(30000);
    var elementSearch = await self.client.findElement('id', APP_PACKAGE + ':id/edtSearch');
    await self.client.setValueImmediate(elementSearch.ELEMENT, table.search);
});

Given(/^No license plate not found$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementRepsone = await self.client.findElement('id', APP_PACKAGE + ':id/tvNoResult');
    await self.client.hideKeyboard();
    var textNotFound = await self.client.getElementText(elementRepsone.ELEMENT);
    await assert.isTrue(textNotFound == 'No license plate found.', "Result license plate is not matched with the expected one");
    // var screenshot = await self.client.takeScreenshot();
    // await self.saveDateScreenshoot(screenshot, '-license-plate-not-found');
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Given(/^I want to data list license plate$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementRes = await self.client.findElement('id', APP_PACKAGE + ':id/tvPlate');
    await self.client.hideKeyboard();
    var textLicense = await self.client.getElementText(elementRes.ELEMENT);
    self.storage.message = textLicense;
    // var screenshot = await self.client.takeScreenshot();
    // await self.saveDateScreenshoot(screenshot, '-license-plate-search-response');
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Given(/^I want to swith status available driver not setup license plate$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var elementTouch = await self.client.findElement('id', APP_PACKAGE + ':id/switchActive')
    await self.client.touchPerform([{ action: 'tap', options: { element: elementTouch.ELEMENT } }])
    await self.client.setImplicitTimeout(5000);
    var elementToast = await self.client.findElement('xpath', '/hierarchy/android.widget.Toast')
    var textToast = await self.client.getElementText(elementToast.ELEMENT);
    debuglog(`textToast:' ${textToast}'`);
    self.storage.message = textToast
});

Given(/^I want to change status booking reservation On the way$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var elementDetail = await self.client.findElement('id', APP_PACKAGE + ':id/relativeLayout')
    await self.client.touchPerform([{ action: 'tap', options: { element: elementDetail.ELEMENT } }])
    await self.client.setImplicitTimeout(30000);
    var elementArrived = await self.client.findElement('id', APP_PACKAGE + ':id/btn_arrived')
    await self.client.touchPerform([{ action: 'tap', options: { element: elementArrived.ELEMENT } }]);
    await self.client.setImplicitTimeout(30000);
    var elementYes = await self.client.findElement('id', APP_PACKAGE + ':id/btnYes')
    await self.client.touchPerform([{ action: 'tap', options: { element: elementYes.ELEMENT } }]);

});

Given(/^I want to start booking car-hailing$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementTouch = await self.client.findElement('id', APP_PACKAGE + ':id/btn_car_hailing');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementTouch.ELEMENT } }]);
    await self.client.setImplicitTimeout(30000);
    var elementYes = await self.client.findElement('id', APP_PACKAGE + ':id/btnYes')
    await self.client.touchPerform([{ action: 'tap', options: { element: elementYes.ELEMENT } }])
});

Given(/^I want to get icon Vip My Trips$/, async function () {
    var self = this;
    var iconVip = false;

    await self.client.setImplicitTimeout(30000);
    var elementIconVip = await self.client.findElement('id', APP_PACKAGE + ':id/imgVip');
    if (elementIconVip.ELEMENT) {
        iconVip = true;
    }
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
    self.storage.messageObject = { iconVip: iconVip }
});

Given(/^I want to touch button OK logout app$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var elementOK = await self.client.findElement('id', APP_PACKAGE + ':id/btnOK')
    if (elementOK.ELEMENT) {
        await self.client.touchPerform([{ action: 'tap', options: { element: elementOK.ELEMENT } }])
    }
})
