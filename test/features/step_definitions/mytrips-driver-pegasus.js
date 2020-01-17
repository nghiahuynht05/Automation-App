var chai = require('chai');
var assert = chai.assert;

var debug = require('debug');
var debuglog = debug('TEST:common');

var APP_PACKAGE = (process.env['APP_PACKAGE']);
var fleetIdENV = process.env.FLEETID;
var { Given, When, Then } = require('cucumber');


Given(/^I want to open booking detail to My trips$/, async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var elementDetail = await self.client.findElement('id', APP_PACKAGE + ':id/relativeLayout');
    await self.client.touchPerform([{ action: 'tap', options: { element: elementDetail.ELEMENT } }]);
});

Given(/^Screenshots app$/, async function () {
    var self = this;
    await self.client.takeScreenshot().then(function (buffer) {
        return self.attach(buffer, 'image/png');
    })
});

Given(/^I want to get time range report driver app$/,async function () {
    var self = this;

    await self.client.setImplicitTimeout(30000);
    var time = await self.client.getDeviceTime();
    console.log(time)
})
