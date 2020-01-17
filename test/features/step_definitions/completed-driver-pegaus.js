var chai = require('chai');
var assert = chai.assert;

var debug = require('debug');
var debuglog = debug('TEST:common');

var APP_PACKAGE = (process.env['APP_PACKAGE']);
var fleetIdENV = process.env.FLEETID;
var { Given, When, Then } = require('cucumber');

Given(/^I want to done form completed payment$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementSubmit = await self.client.findElement('id', APP_PACKAGE + ':id/tvDone');
    debuglog(`'elementSubmit' ${elementSubmit}'`)
    await self.client.touchPerform([{ action: 'tap', options: { element: elementSubmit.ELEMENT } }]);
});

Given(/^I want to get message completed booking$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var toastElement = await self.client.findElement('xpath', '/hierarchy/android.widget.Toast');
    var toastMessage = await self.client.getElementText(toastElement.ELEMENT);
    debuglog(`toastMessage:' ${toastMessage}'`);
    self.storage.message = toastMessage;
});

Given(/^I want to open form Completed booking with "([^"]*)"$/, function (method) {
    var self = this;
    setTimeout(async function () {
        try {
            // var data = await self.client.takeScreenshot();
            // await self.saveDateScreenshoot(data, '-form-comleted-booking-' + method);
            await self.client.takeScreenshot().then(function (buffer) {
                return self.attach(buffer, 'image/png');
            })        
        } catch (error) {
            console.log(error)
        }
    }, 8000)
});

Given(/^I want to get info completed booking when hide fare$/, async function () {
    var self = this;
    var bookId = self.storage.returnData.bookId;
    var IsBookId = false

    await self.client.setImplicitTimeout(30000);
    var elementBookId = await self.client.findElement('id', APP_PACKAGE + ':id/tvBookId2');
    textBookId = (await self.client.getElementText(elementBookId.ELEMENT)).substr(1, 9)
    if (textBookId == bookId) {
        IsBookId = true
    }
    var elementPaymentmethod = await self.client.findElement('id', APP_PACKAGE + ':id/tvPaymentMethod2');
    var textPayment = await self.client.getElementText(elementPaymentmethod.ELEMENT);
    var elementPsg = await self.client.findElement('id', APP_PACKAGE + ':id/tvFullNamePsg');
    var textPsg = await self.client.getElementText(elementPsg.ELEMENT);
    var elementPU = await self.client.findElement('id', APP_PACKAGE + ':id/tvPickup');
    var textPU = await self.client.getElementText(elementPU.ELEMENT);
    var elementPO = await self.client.findElement('id', APP_PACKAGE + ':id/tvDestination');
    var textPO = await self.client.getElementText(elementPO.ELEMENT);
    self.storage.messageObject = {
        isBook: IsBookId, Paymenmethod: textPayment, PickUp: textPU, Destination: textPO
    };
})