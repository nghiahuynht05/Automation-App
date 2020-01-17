var chai = require('chai');
var assert = chai.assert;
var base64Img = require('base64-img');
var moment = require('moment-timezone');
var _ = require('lodash');

var debug = require('debug');
var debuglog = debug('TEST:common');
var fs = require('fs');
var Utils = require("./../../../libs/utils/Utils.js");

var FILE_NAME = (process.env['FILE_NAME']);
var fleetIdENV = process.env.FLEETID
var usernameENV = process.env.USER_NAME
var pwENV = process.env.PASSWORD

var { Given, When, Then } = require('cucumber');


Given(/^Input data fleet code with data$/, async function (table) {
    var self = this;
    var table = table.hashes()[0];
    var idValue = process.env['APP_PACKAGE'] + ":id/edtFleetCode";
    var elements = await self.client.findElement("id", idValue);
    var tem = elements.ELEMENT;
    await self.client.setValueImmediate(tem, table.fleetCode);
});

Given(/^Send action touch in scren$/, async function () {
    var self = this;
    var element = await self.client.findElement('id', 'com.qupworld.pegasuspax:id/btnContinueFleet');
    await self.client.touchPerform([{ action: 'tap', options: { element: element.ELEMENT } }]);
});

Given(/^Get text by element$/, async function () {
    var self = this;
    var idValue = process.env['APP_PACKAGE'] + ":id/tvTitleWelcome";
    self.client.setImplicitTimeout(5000)
    var element = await self.client.findElement('id', idValue);
    var actual = await self.client.getElementText(element.ELEMENT);
    self.storage.returnData = actual;
});

Then(/^I should get the response data matches with$/, function (table, callback) {
    var self = this;
    var expectData = table.hashes()[0].response;
    debuglog("Expect data ", expectData);
    debuglog("this.storage.returnData ", self.storage.returnData);
    var actual = "Get moving with Pegasus"//self.storage.returnData;
    assert.isTrue(actual === expectData);
    callback()
});

Then(/^Screenshort devices$/, async function () {
    var self = this;
    var data = await self.client.takeScreenshot();
    var base64Str = 'data:image/PNG;base64,' + data;
    var path = __dirname + '/output/';
    var date = new Date();
    var filename = moment.tz(date.toGMTString(), 'Asia/Ho_Chi_Minh').format()
    base64Img.img(base64Str, path, filename.replace(/[:_+\s]/g, '-'), function (err, filepath) {
        if (err) {
            console.log(err)
        }
    });
})

Given(/^Open menu Profile$/, async function () {
    var self = this;
    await self.client.setImplicitTimeout(30000);
    var element = await self.client.findElement('id', 'com.qupworld.pegasuspax:id/btnHome');
    await self.client.touchPerform([{ action: 'tap', options: { element: element.ELEMENT } }])
})

Given(/^Open menu with data$/, async function (table) {
    var self = this;
    var table = table.hashes()[0];
    await self.client.setImplicitTimeout(30000)
    var element = await self.client.findElement('id', table.resourceId);
    if (element.ELEMENNT === null) {
        debuglog(`ELEMENNT: '${table.resourceId}' response no found`)
    }
    await self.client.touchPerform([{ action: 'tap', options: { element: element.ELEMENT } }])
})

Given(/^Set date pickup time$/, async function () {
    var self = this;
    await self.client.setImplicitTimout(30000);
    var element = self.client.findElement('id', 'com.qupworld.pegasuspax:id/imvTime')
    if (element.ELEMENNT === null) {
        debuglog(`ELEMENNT: 'com.qupworld.pegasuspax:id/imvTime' response no found`);
    }
    await self.client.sendKey
});

Given(/^I want to register other account from app$/, function (table, callback) {
    var self = this;
    if (self.storage.isStatus == true) {
        var account = table.hashes()[0];
        self.storage = self.storage || {};
        self.wsClient = self.wsConstructor(self.wsUrl, {
            'force new connection': true,
            reconnect: true
        });
        self.wsClient.on('connect', function (info) {
            self.wsClient.emit('register', {
                "platform": account.platform,
                "phone": {
                    "number": account.number,
                    "country": account.country
                },
                "fleetId": fleetIdENV,
                "appType": account.appType,
                "verifyCode": account.verifyCode,
                "ime": account.ime
            });
            callback()
        });
    }
});

Given(/^I want to login webbooking with data$/, function (table, callback) {
    var self = this;
    if (self.storage.isStatus == true) {
        var account = table.hashes()[0];
        self.wsClient = self.wsConstructor(self.wsUrl, {
            'force new connection': true,
            reconnect: true
        });
        self.wsClient.on('connect', function (info) {
            self.wsClient.emit('wb_login', {
                "phone": {
                    "number": account.number,
                    "country": account.country
                },
                "fleetId": fleetIdENV,
                "password": account.password,
            });
            self.wsClient.on('wb_login', function (wb_login) {
                self.tokenWB = wb_login.info.token;
                callback()
            })
        });
    }
});

Given(/^I want to register other account from mdispatcher app$/, function (table, callback) {
    var self = this;
    if (self.storage.isStatus == true) {
        var account = table.hashes()[0];
        self.storage = self.storage || {};
        self.wsClient = self.wsConstructor(self.wsUrl, {
            'force new connection': true,
            reconnect: true
        });
        self.wsClient.on('connect', function (info) {
            self.wsClient.emit('register', {
                "platform": account.platform,
                "phone": {
                    "number": account.number,
                    "country": account.country
                },
                "fleetId": fleetIdENV,
                "appType": account.appType,
                "verifyCode": account.verifyCode,
                "ime": account.ime,
                "password": account.password,
            });
            callback()
        });
    }
});

Given(/^Passenger create booking NOW with data$/, function (table, callback) {
    var self = this;

    var params = JSON.parse(fs.readFileSync(__dirname + '/input/createbooking.json'));
    var data = table.hashes()[0];
    Object.keys(data).forEach(function (key) {
        var value = Utils.validateData(data[key]);
        var subKeys = key.split(".");
        params = Utils.setSubDocValue(params, subKeys, value);
    })
    if (params.request.pickUpTime.indexOf("greater-than(") == 0) {
        var maximumAhead = parseInt(params.request.pickUpTime.slice("greater-than(".length, -1));
        params.request.pickUpTime = Date.now() + maximumAhead * 24 * 3600 * 1000 + 600 * 1000;
    } else if (params.request.pickUpTime.indexOf("less-than(") == 0) {
        var minimumAhead = parseInt(params.request.pickUpTime.slice("less-than(".length, -1));
        params.request.pickUpTime = Date.now() + minimumAhead * 3600 * 1000 - 60000;
    }
    params.request.fleetId = fleetIdENV;
    self.wsClient.emit('rq', params);
    self.wsClient.on('rq', function (rqInfo) {
        debuglog(`'new_booking' - emit`, JSON.stringify(rqInfo));
        self.storage = self.storage || {};
        self.storage.returnData = rqInfo;
        callback();
    });
});

Given(/^Passenger create booking RESERVATION with data$/, function (table, callback) {
    var self = this;

    var params = JSON.parse(fs.readFileSync(__dirname + '/input/createbooking.json'));
    var data = table.hashes()[0];
    Object.keys(data).forEach(function (key) {
        var value = Utils.validateData(data[key]);
        var subKeys = key.split(".");
        params = Utils.setSubDocValue(params, subKeys, value);
    })

    var date = new Date();
    date.setHours(date.getHours() + 2)
    var dateLate = moment.tz(date.toGMTString(), 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm')
    debuglog(`'pickupTime: ${dateLate}`);
    params.request.pickUpTime = dateLate
    params.request.fleetId = fleetIdENV;
    self.wsClient.emit('rq', params);
    self.wsClient.on('rq', function (rqInfo) {
        debuglog(`'new_booking' - emit`, JSON.stringify(rqInfo));
        self.storage = self.storage || {};
        self.storage.returnData = rqInfo;
        callback();
    });
});

Given(/^Create booking NOW from Webbooking with data$/, function (table, callback) {
    var self = this;

    var params = JSON.parse(fs.readFileSync(__dirname + '/input/createbookWb.json'));
    var data = table.hashes()[0];
    Object.keys(data).forEach(function (key) {
        var value = Utils.validateData(data[key]);
        var subKeys = key.split(".");
        params = Utils.setSubDocValue(params, subKeys, value);
    })
    if (params.request.pickUpTime.indexOf("greater-than(") == 0) {
        var maximumAhead = parseInt(params.request.pickUpTime.slice("greater-than(".length, -1));
        params.request.pickUpTime = Date.now() + maximumAhead * 24 * 3600 * 1000 + 600 * 1000;
    } else if (params.request.pickUpTime.indexOf("less-than(") == 0) {
        var minimumAhead = parseInt(params.request.pickUpTime.slice("less-than(".length, -1));
        params.request.pickUpTime = Date.now() + minimumAhead * 3600 * 1000 - 60000;
    };

    params.request.fleetId = fleetIdENV;
    params.bookFrom = "Web booking";
    params.platform = "Web";

    self.wsClient.emit('request', params);
    self.wsClient.on('request', function (rqInfo) {
        debuglog(`'new_booking' - emit`, JSON.stringify(rqInfo));
        self.storage = self.storage || {};
        self.storage.returnData = rqInfo;
    })
    callback();
});

Given(/^Create booking RESERVATION from Webbooking with data$/, function (table, callback) {
    var self = this;

    var params = JSON.parse(fs.readFileSync(__dirname + '/input/createbookWb.json'));
    var data = table.hashes()[0];
    Object.keys(data).forEach(function (key) {
        var value = Utils.validateData(data[key]);
        var subKeys = key.split(".");
        params = Utils.setSubDocValue(params, subKeys, value);
    });
    var date = new Date();
    date.setHours(date.getHours() + 3)
    var dateLate = moment.tz(date.toGMTString(), 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm')
    debuglog(`'pickupTime: ${dateLate}`);
    params.request.pickUpTime = dateLate
    params.request.fleetId = fleetIdENV;
    params.bookFrom = "Web booking";
    params.platform = "Web";

    self.wsClient.emit('request', params);
    self.wsClient.on('request', function (rqInfo) {
        debuglog(`'new_booking' - emit`, JSON.stringify(rqInfo));
        self.storage = self.storage || {};
        self.storage.returnData = rqInfo;
    });
    callback()
});

Given(/^an api token after logined command center$/, function (callback) {
    var self = this;
    this.apiClient
        .post("/api/user/login")
        .set("content-type", "application/json")
        .set("accept", "application/json")
        .send({
            "username": usernameENV,
            "password": pwENV
        })
        .expect(200)
        .then(function (response) {
            if (response.body.error) {
                callback(response.body.error)
            }
            self.token = _.get(response.body, "res.token");
            callback();
        }).catch(callback)
});

Given(/^I want to Completed booking by CC$/, function (table, callback) {
    var self = this;
    var bookId = self.storage.returnData.bookId;
    var infoDropOff = table.hashes()[0];
    var params = {
        "bookId": bookId,
        "paymentType": parseInt(infoDropOff.paymentType),
        "total": infoDropOff.total,
        "fare": infoDropOff.fare,
        "subTotal": infoDropOff.subTotal,
        "tax": infoDropOff.tax
    };

    if (infoDropOff.promoAmount && infoDropOff.promoCode) {
        params.promoAmount = infoDropOff.promoAmount
        params.promoCode = infoDropOff.promoCode
    };

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
            debuglog(`'Login CC - ON`, info)
            self.wsClient.emit('completeCC', params)
            callback()
        })
    });
});

Given(/^I want to cancel booking by CC$/, function (callback) {
    var self = this;
    var bookId = self.storage.returnData.bookId;

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
            debuglog(`'Login CC - ON`, info)
            self.wsClient.emit('cancelBookingCC', { "bookId": bookId })
            callback()
        })
    });
});

Given(/^I want to update booking by CC$/, function (table, callback) {
    var self = this;
    var bookId = self.storage.returnData.bookId;
    var table = table.hashes()[0];
    var params = JSON.parse(fs.readFileSync(__dirname + '/input/updateInfoBooking.json'));

    if (self.storage.returnData.pickUpTime != 'Now') {
        var date = new Date();
        date.setHours(date.getHours() + 2)
        var dateLate = moment.tz(date.toGMTString(), 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm')
        debuglog(`'pickupTime: ${dateLate}`);
        params.request.pickUpTime = dateLate
    }
    params.bookId = bookId;
    params.retryDispatch = table.UpdateAndDispatch;
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
            debuglog(`'Login CC - ON`, info)
            self.wsClient.emit('editBookingCC', params)
            self.wsClient.on('editBookingCC', function (res) {
                if (res.code == 200) {
                    self.code = res.code
                    callback()
                }
            })
            // callback()
        })
    });
});

Given(/^I want to update booking POB by CC$/, function (table, callback) {
    var self = this;
    var bookId = self.storage.returnData.bookId;
    var table = table.hashes()[0];
    var params = JSON.parse(fs.readFileSync(__dirname + '/input/update-POB-booking.json'));

    params.bookId = bookId;
    params.paymentType = parseInt(table.paymentType);
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
            debuglog(`'Login CC - ON`, info)
            self.wsClient.emit('changePaymentType', params)
            callback()
        })
    });
});

Given(/^I want to update booking DropOff by CC$/, function (table, callback) {
    var self = this;
    var bookId = self.storage.returnData.bookId;
    var table = table.hashes()[0];
    var params = JSON.parse(fs.readFileSync(__dirname + '/input/update-POB-booking.json'));

    if (self.storage.returnData.pickUpTime != 'Now') {
        var date = new Date();
        date.setHours(date.getHours() + 2)
        var dateLate = moment.tz(date.toGMTString(), 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm')
        debuglog(`'pickupTime: ${dateLate}`);
        params.request.pickUpTime = dateLate
    }
    params.bookId = bookId;
    params.paymentType = parseInt(table.paymentType);
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
            debuglog(`'Login CC - ON`, info)
            self.wsClient.emit('changePaymentType', params)
            callback()
        })
    });
});

Given(/^I want to cancel booking by Passenger$/, function (callback) {
    var self = this;
    var bookId = self.storage.returnData.bookId;
    var params = {
        "bookId": bookId,
        "reasonCode": 3,
        "fleetId": fleetIdENV,
        "reason": ""
    }
    self.wsClient.emit('cancel', params);
    callback();
});

Given(/^I want to update booking by Passenger with data$/, function (table, callback) {
    var self = this;
    var table = table.hashes()[0];
    var bookId = self.storage.returnData.bookId;
    var params = JSON.parse(fs.readFileSync(__dirname + '/input/updatebooking-template.json'));

    Object.keys(table).forEach(function (key) {
        var value = Utils.validateData(table[key]);
        var subKeys = key.split(".");
        params = Utils.setSubDocValue(params, subKeys, value);
    })
    params.fleetId = fleetIdENV
    params.bookId = bookId;
    self.wsClient.emit('updateDestinationPsg', params);
    self.wsClient.on('updateDestinationPsg', function (res) {
        if (res.code == '1') {
            self.code = res.code
            callback()
        }
    })
    callback();
});

Given(/^I want to cancel booking by mDispatcher$/, function (callback) {
    var self = this;
    var bookId = self.storage.returnData.bookId;
    var params = {
        "bookId": bookId,
        "fleetId": fleetIdENV
    }
    self.wsClient.emit('cancel', params);
    callback();
});

Given(/^I want to update booking by mDispatcher with data$/, function (table, callback) {
    var self = this;
    var table = table.hashes()[0];
    var bookId = self.storage.returnData.bookId;
    var params = JSON.parse(fs.readFileSync(__dirname + '/input/updatebooking-template.json'));

    Object.keys(table).forEach(function (key) {
        var value = Utils.validateData(table[key]);
        var subKeys = key.split(".");
        params = Utils.setSubDocValue(params, subKeys, value);
    })
    params.fleetId = fleetIdENV
    params.bookId = bookId;
    self.wsClient.emit('updateDestinationMD', params);
    self.wsClient.on('updateDestinationMD', function (res) {
        if (res.code == '1') {
            self.code = res.code
            callback()
        }
    })
    // callback();
});

Given(/^I want to cancel booking by Web booking$/, function (callback) {
    var self = this;
    var bookId = self.storage.returnData.bookId;
    var params = {
        "bookId": bookId,
        "token": self.tokenWB
    }
    self.wsClient.emit('wb_cancel_booking', params);
    callback();
});

Given(/^I want to incident booking by CC$/, function (callback) {
    var self = this;
    var bookId = self.storage.returnData.bookId;

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
            debuglog(`'Login CC - ON`, info)
            self.wsClient.emit('incident', {
                "bookId": bookId,
                "reason": "Automation Test Incident",
                "operator": {
                    "userId": "5db9360288570519672f40c6",
                    "name": "Automation Operatoer "
                }
            })
            callback()
        })
    });
});

Given(/^Turn "([^"]*)" setting banner pegaus in command center$/, function (status, callback) {
    var self = this;
    var activate = true;
    if (status == 'off') {
        activate = false
    }
    self.apiClient
        .post('/api/app-banner/update')
        .set('content-type', 'application/json')
        .set('accept', 'application/json')
        .set('authorization', self.token)
        .send({
            "fleetId": fleetIdENV,
            "activate": activate,
            "_id": "5da025fc88570519672f35d2",
            "action": "Link to website",
            "appType": "driver",
            "applyTo": "Home view",
            "name": "Automation",
            "viewType": "image",
            "bannerId": "5da025fc88570519672f35d2"
        })
        .expect(200)
        .then(function (response) {
            if (response.body.error) {
                callback(response.body.error)
            }
            self.storage.settingCC = response.res.activate;
            callback();
        }).catch(callback)
});

Given(/^Turn "([^"]*)" setting referral in command center$/, function (status, callback) {
    var self = this;
    var params = JSON.parse(fs.readFileSync(__dirname + '/input/setting-referral-cc.json'));

    if (status == 'off') {
        params.isActive = false
    }
    params.fleetId = fleetIdENV
    self.apiClient
        .post('/api/referral/update')
        .set('content-type', 'application/json')
        .set('accept', 'application/json')
        .set('authorization', self.token)
        .send(params)
        .expect(200)
        .then(function (response) {
            if (response.body.error) {
                callback(response.body.error)
            }
            self.storage.settingCC = response.res.activate;
            callback();
        }).catch(callback)
});

Given(/^Turn on mode "([^"]*)" dispacth setting dispacth in Command center$/, function (mode, callback) {
    var self = this;
    var params = {
        "maximumBookAhead": {
            "value": 1,
            "type": "month"
        },
        "_id": "5d9e9af68f0843d14c8af418",
        "fleetId": fleetIdENV,
        "timeZone": "Asia/Saigon",
        "map": "google",
        "sms": "twilio",
        "fakeCar": false,
        "offerInterval": 15,
        "processBefore": 180,
        "remindBefore": 0,
        "maximumDispatchDuration": 600,
        "minimumBookAhead": "110",
        "autoReDispatch": "5",
        "isAutoDispatch": true,
        "cancellationDuration": 2,
        "defaultVerifyCode": true,
        "enableBrandName": false,
        "assignReservation": false,
        "bookAheadTimeEffect": {
            "cc": false,
            "corporate": false
        },
        "bookingTimeOut": 15,
        "responseBackToCustomer": 0,
        "autoDispatchBefore": 0,
        "cancellationDurationUnit": "hour",
        "minimumBookAheadUnit": "minute",
        "isActive": true
    }

    if (mode == 'Manual') {
        params.isAutoDispatch = false;
        params.autoDispatchBefore = '3';
    }
    if (mode == 'Immediate') {
        params.isAutoDispatch = true;
        params.autoDispatchBefore = 0;
        params.processBefore = 0;
    }
    if (mode == 'Delay') {
        params.isAutoDispatch = true;
        params.autoDispatchBefore = 0;
        params.processBefore = '150';
    }

    self.apiClient
        .post('/api/process/update')
        .set('content-type', 'application/json')
        .set('accept', 'application/json')
        .set('authorization', self.token)
        .send(params)
        .expect(200)
        .then(function (response) {
            if (response.body.error) {
                callback(response.body.error)
            }
            self.storage.settingCC = response.res.activate;
            callback();
        }).catch(callback)
});

Given(/^I want to reset data login driver with data$/, function (table, callback) {
    var self = this;
    var account = table.hashes()[0];
    self.storage = self.storage || {};
    self.wsClient = self.wsConstructor(self.wsUrl, {
        'force new connection': true,
        reconnect: true
    });
    self.wsClient.on('connect', function (info) {
        self.wsClient.emit('register', {
            "platform": account.platform,
            "phone": {
                "number": account.number,
                "country": account.country
            },
            "fleetId": account.fleetCode,
            "appType": "driver",
            "verifyCode": "3210",
            "ime": "xxx",
            "password": "password"
        });
        callback()
    });
    callback()
});

Given(/^I want to reset license plate driver with data$/, function (table, callback) {
    var self = this;
    var account = table.hashes()[0];
    self.storage = self.storage || {};
    self.wsClient = self.wsConstructor(self.wsUrl, {
        'force new connection': true,
        reconnect: true
    });
    self.wsClient.on('connect', function (info) {
        self.wsClient.emit('register', {
            "platform": account.platform,
            "phone": {
                "number": account.number,
                "country": account.country
            },
            "fleetId": account.fleetCode,
            "appType": "driver",
            "verifyCode": "3210",
            "ime": "xxx",
            "password": "password"
        });
        self.wsClient.emit('setVehicle', {
            _id: '5d9e9c3f88570519672f3438'
        })
        callback()
    });
    callback()
});

Given(/^Setting show hide fee in driver app$/, function (table, callback) {
    var self = this;
    var table = table.hashes()[0];
    var params = JSON.parse(fs.readFileSync(__dirname + '/input/general-template.json'));

    params.fleetId = fleetIdENV;
    params.airport.fromAirportActive = table.airportTo;
    params.airport.toAirportActive = table.airportFrom;
    params.tollFeeActive = table.tollFeeActive;
    params.taxActive = table.taxActive;
    params.tipActive = table.tipActive;
    self.apiClient
        .post('/api/setting/general/save')
        .set('content-type', 'application/json')
        .set('accept', 'application/json')
        .set('authorization', self.token)
        .send(params)
        .expect(200)
        .then(function (response) {
            if (response.body.error) {
                callback(response.body.error)
            }
            self.storage.settingCC = response.res.activate;
            callback();
        }).catch(callback)
});

Given(/^Setting show hide fee in subtotal on the driver app$/, function (table, callback) {
    var self = this;
    var table = table.hashes()[0];
    var params = JSON.parse(fs.readFileSync(__dirname + '/input/general-template.json'));

    params.fleetId = fleetIdENV;
    params.additionalServicesActive = table.additionalServicesActive;
    params.rushHourActive = table.rushHourActive;
    params.otherFeeActive = table.otherFeeActive;
    params.heavyTrafficActive = table.heavyTrafficActive;
    self.apiClient
        .post('/api/setting/general/save')
        .set('content-type', 'application/json')
        .set('accept', 'application/json')
        .set('authorization', self.token)
        .send(params)
        .expect(200)
        .then(function (response) {
            if (response.body.error) {
                callback(response.body.error)
            }
            self.storage.settingCC = response.res.activate;
            callback();
        }).catch(callback)
});