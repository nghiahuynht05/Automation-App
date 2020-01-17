const { Before, After } = require('cucumber');
const wdio = require("webdriverio");
const _ = require('lodash');

//get config fleetId in env
var fleetIdENV = process.env.FLEETID

// Before hooks run before the first step of each scenario.
// Start connect to APPIUM to device with confi capabilities
Before(async function () {
    const opts = {
        port: 4723,
        capabilities: {
            platformName: "Android",
            platformVersion: process.env['OS_INFO'],
            deviceName: "Android Emulator",
            language: process.env['LANGUAGE_DEVICE'],
            locale: process.env['LOCALE_DEVICE'],
            //app: __dirname + "/input/" + FILE_NAME,// install app in device when call app
            automationName: "UiAutomator2",
            appPackage: process.env['APP_PACKAGE'], //info get to APK Info App
            appActivity: "com.qup.driver.ui.launcher.LauncherActivity", //info get to APK Info App
            skipDeviceInitialization: true, // skip installing the io.appium.settings app on the device 
            skipServerInstallation: true, //
            noReset: true,//
            autoGrantPermissions: true
        }
    };
    this.client = await wdio.remote(opts);
})

// After hooks run after the last step of each scenario, even when steps are failed, undefined, pending, or skipped
// Cancel booking of driver
After(function () {
    var self = this;
    var res = self.storage;
    if (_.get(res, 'returnData.bookId')) {
        var bookId = res.returnData.bookId
        self.wsClient = self.wsConstructor(self.wsUrl, {
            'force new connection': true,
            reconnect: true
        });
        self.wsClient.on('connect', function () {
            self.wsClient.emit('ccLiteLogin', {
                "token": self.token,
                "fleetId": fleetIdENV
            })

            self.wsClient.on('ccLiteLogin', function (info) {
                self.wsClient.emit('cancelBookingCC', { "bookId": bookId });
                self.wsClient.on('cancelBookingCC', function (info) {
                    if (info.returnCode == 400) {
                        self.wsClient.emit('incident', {
                            "bookId": bookId,
                            "reason": "Automation Incident",
                            "operator": { "name": "Automation Operator", "userId": "5db9360288570519672f40c6" }
                        })
                    }
                })
            })
        });
    }
    else {
        return 0
    }
})
// Disconnect
After(function () {
    this.wsClient.disconnect()
})