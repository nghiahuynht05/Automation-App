var _ = require('lodash');
var client = require('supertest')
var socketClient = require('socket.io-client');
var base64Img = require('base64-img');
var moment = require('moment-timezone');

var { setWorldConstructor, setDefaultTimeout } = require('cucumber');
setDefaultTimeout(100000)

function World({ attach }) {
  this.storage = {}
  this.wsUrl = "https://" + (process.env['JUPITER_BETA_URL']);
  this.apiUrlCC = "https://" + (process.env['NEWCC_API']);

  this.wsClient = socketClient(this.wsURL);
  this.apiClient = client(this.apiUrlCC)

  this.wsConstructor = socketClient;

  this.attach = attach; // define attach to report cucumber

  this.saveDateScreenshoot = function (data, name) {
    var base64Str = 'data:image/PNG;base64,' + data;
    var path = './test/features/step_definitions/output';
    var date = new Date();
    var filename = moment.tz(date.toGMTString(), 'Asia/Ho_Chi_Minh').format() + name
    base64Img.img(base64Str, path, filename.replace(/[:_+\s]/g, '-'), function (err, filepath) {
      if (err) {
        console.log(err)
      }
    });
  }

  this.matchData = function (data, expect) {
    var self = this;
    if (_.isArray(expect) && _.isArray(data)) {
      return expect.every(function (item) {
        return data.some(function (datum) {
          return self.matchData(datum, item);
        })
      })
    } else {
      return _.isMatchWith(data, expect, matchFn)
    }
  }

  this.matchDataWithTheSameOrder = function (data, expect) {
    var self = this;
    if (_.isArray(expect) && _.isArray(data)) {
      return expect.every(function (item, index) {
        return self.matchDataWithTheSameOrder(data[index], item);
      })
    } else {
      return _.isMatchWith(data, expect, matchWithOrderFn)
    }
  }

  function matchWithOrderFn(obj, src) {
    if (!_.isObject(obj)) {
      return obj === src
    }
    if (_.isArray(src) && _.isArray(obj)) {
      return src.every(function (item, index) {
        return matchWithOrderFn(obj[index], item);
      })
    } else {
      if (_.matches(src)(obj)) return true;
      return Object.keys(src).every(function (key) {
        return matchWithOrderFn(obj[key], src[key]);
      })
    }

    return false;
  }

  function matchFn(obj, src) {
    if (!_.isObject(obj)) {
      return obj === src
    }
    if (_.isArray(src) && _.isArray(obj)) {
      return src.every(function (item) {
        return obj.some(function (datum) {
          return matchFn(datum, item);
        })
      })
    } else {
      if (_.matches(src)(obj)) return true;
      return Object.keys(src).every(function (key) {
        return matchFn(obj[key], src[key]);
      })
    }
    return false;
  }
};

setWorldConstructor(World)