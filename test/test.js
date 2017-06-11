var chai = require('chai');
var chaiHttp = require('chai-http');
var TestObject = require('../lib/TestObject');
var should = chai.should();

chai.use(chaiHttp);

describe('TestObject', function() {
  it('can be instantiated with `new`', function () {
    sauce = new TestObject();
    sauce.should.be.an.instanceof(TestObject)
  })
});

describe('once instantiated', function() {
  beforeEach(function () {
    let config = {
      username: process.env.TEST_OBJECT_USERNAME,
      apiKey: process.env.TEST_OBJECT_SAMPLE_API_KEY,
      password: process.env.TEST_OBJECT_MASTER
    }
    testObject = new TestObject(config);
  });

  afterEach(function () {
    testObject = null;
  });

  describe('#updateTestStatus', function() {
    it('Updates the Test status', function(done) {
      let status = {"passed": true};
      testObject.UpdateTestStatus('e492a939-3717-434c-9421-187a4c4a2361', status, function(resp) {
        resp.statusCode.should.equal(204);
        done();
      });
    });
  });

  describe('#skipTest', function() {
    it('Sets the test status as skipped', function(done) {
      testObject.SkipTest('e492a939-3717-434c-9421-187a4c4a2361', function(resp) {
        resp.statusCode.should.equal(204);
        done();
      });
    });
  });

  describe('Devices #getDevices' , function() {
    it('GETs Devices', function(done) {
      testObject.GetDevices (function(resp, body) {
        body.should.be.a('string');
        resp.statusCode.should.equal(200);
        done();
      });
    });
  });

  describe('Devices #getAllDevices', function() {
    it('GETs all devices including private devices', function(done) {
      testObject.GetAllDevices(function(resp, body) {
        body.should.be.a('string');
        resp.statusCode.should.equal(200);
        done();
      });
    });
  });

  describe('Devices #getAllAvailableDevices', function() {
    it('GETs all available devices including private devices', function(done) {
      testObject.GetAllAvailableDevices(function(resp, body) {
        body.should.be.a('string');
        resp.statusCode.should.equal(200);
        done();
      });
    });
  });

  describe('Devices #getAvailable', function() {
    it('GETs all available devices', function(done) {
      testObject.GetAvailable(function(resp, body) {
        body.should.be.a('string');
        resp.statusCode.should.equal(200);
        done();
      });
    });
  });

  describe('Devices #getDeviceImage', function() {
    it('GETs image of selected device', function(done) {
      testObject.GetDeviceImage('iPad_Air_16GB_real', function(resp, body) {
        resp.statusCode.should.equal(200);
        done();
      });
    });
  });

  describe('Devices #getPopular', function() {
    it('GETs popular devices based on region', function(done) {
      testObject.GetPopularDevices(function(resp, body) {
        body.should.be.a('string');
        resp.statusCode.should.equal(200);
        done();
      });
    });
  });

  describe('Devices #getDeviceStatus', function() {
    it('GETs the status of a selected device', function(done) {
      testObject.GetDeviceStatus('iPad_Air_16GB_real', function(resp, body) {
        console.log(body);
        resp.statusCode.should.equal(200);
        done();
      });
    });
  });


})


