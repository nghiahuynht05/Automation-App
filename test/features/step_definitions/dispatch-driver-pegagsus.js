var chai = require('chai');
var assert = chai.assert;

var debug = require('debug');
var debuglog = debug('TEST:common');

var APP_PACKAGE = (process.env['APP_PACKAGE'])

var { Given, When, Then } = require('cucumber');

Then(/^I want to receive booking screen$/, async function () {
    var self = this;
    self.storage.message = {}
    await self.client.setImplicitTimeout(30000);
    var elementAccept = await self.client.findElement('id', APP_PACKAGE + ':id/imv_avatar');
    if (elementAccept.error != 'no such element') {
        // var data = await self.client.takeScreenshot();
        // self.saveDateScreenshoot(data, '-screen-receive-dispatch-form')
        await self.client.takeScreenshot().then(function (buffer) {
            return self.attach(buffer, 'image/png');
        })
    }
});

Then(/^I want to receive not booking screen$/, async function () {
    var self = this;
    self.storage.message = {}
    await self.client.setImplicitTimeout(30000);
    var elementAccept = await self.client.findElement('id', APP_PACKAGE + ':id/imv_avatar');
    if (elementAccept.ELEMENT) {
        // var data = await self.client.takeScreenshot();
        // self.saveDateScreenshoot(data, '-screen-not-receive-dispatch-form')
        await self.client.takeScreenshot().then(function (buffer) {
            return self.attach(buffer, 'image/png');
        })
    }
});

Then(/^I want to lock srceen device$/, function (callback) {
    var self = this;
    self.storage.message = {}
    self.client.lock(15);
    callback()
});

Then(/^I want to background driver app on device$/, function () {
    var self = this;
    self.storage.message = {}
    self.client.background(30);
    // callback()
});

Then(/^I would open screen On The Way$/, async function () {
    var self = this;
    self.storage.message = {}
    await self.client.setImplicitTimeout(30000);
    var elementAccept = await self.client.findElement('id', APP_PACKAGE + ':id/btn_arrived');
    if (elementAccept.ELEMENT);
    {
        // var data = await self.client.takeScreenshot();
        // self.saveDateScreenshoot(data, '-screen-on-the-way')
        await self.client.takeScreenshot().then(function (buffer) {
            return self.attach(buffer, 'image/png');
        })
    }
});

Then(/^I want to get message cancel booking form driver app$/, async function () {
    var self = this;
    self.storage.message = {}
    await self.client.setImplicitTimeout(30000);
    var elementContent = await self.client.findElement('id', APP_PACKAGE + ':id/tv_content_mess');
    if (elementContent.ELEMENT);
    {
        var textContent = await self.client.getElementText(elementContent.ELEMENT)
        var textCancel = textContent.slice(textContent.search('has been canceled'), -1);
        self.storage.message = textCancel
        // var data = await self.client.takeScreenshot();
        // self.saveDateScreenshoot(data, '-screen-cancel-booking')
        await self.client.takeScreenshot().then(function (buffer) {
            return self.attach(buffer, 'image/png');
        })
    }
});