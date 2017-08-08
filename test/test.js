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
      let status = {"passed": false};
      testObject.updateTest('218a6a8c-4d42-4479-b6f9-d7cb7de4d8db', status, function(err, resp) {
        resp.statusCode.should.equal(204);
        done();
      });
    });
  });

  describe('#skipTest', function() {
    it('Sets the test status as skipped', function(done) {
      testObject.skipTest('218a6a8c-4d42-4479-b6f9-d7cb7de4d8db', function(err, resp) {
        resp.statusCode.should.equal(204);
        done();
        });
    });
  });

  describe('Devices #getDevices' , function() {
    it('GETs Devices', function(done) {
      testObject.getDevices (function(err, resp, body) {
        body.should.be.a('string');
        resp.statusCode.should.equal(200);
      });
      done();
    });
  });

  describe('Devices #getAllDevices', function() {
    it('GETs all devices including private devices', function(done) {
      testObject.getAllDevices(function(err, resp, body) {
        body.should.be.a('string');
        resp.statusCode.should.equal(200);
      });
      done();
    });
  });

  describe('Devices #getAllAvailableDevices', function() {
    it('GETs all available devices including private devices', function(done) {
      testObject.getAllAvailable(function(err, resp, body) {
        body.should.be.a('string');
        resp.statusCode.should.equal(200);
        done();
      });
    });
  });

  describe('Devices #getAvailable', function() {
    it('GETs all available devices', function(done) {
      testObject.getAvailable(function(err, resp, body) {
        body.should.be.a('string');
        resp.statusCode.should.equal(200);
        done();
      });
    });
  });

  describe('Devices #getDeviceImage', function() {
    it('GETs image of selected device', function(done) {
      testObject.getDeviceImage('iPad_Air_16GB_real', function(err, resp, body) {
        resp.statusCode.should.equal(200);
        done();
      });
    });
  });

  describe('Devices #getPopular', function() {
    it('GETs popular devices based on region', function(done) {
      testObject.getPopular(function(err, resp, body) {
        body.should.be.a('string');
        resp.statusCode.should.equal(200);
        done();
      });
    });
  });

  describe('Devices #getDeviceStatus', function() {
    it('GETs the status of a selected device', function(done) {
      testObject.getDeviceStatus('iPad_Air_16GB_real', function(err, resp, body) {
        resp.statusCode.should.equal(200);
        done();
      });
    });
  });

  describe('Devices #getDeviceInfo', function() {
    it('GETs information for a particular device', function(done) {
      testObject.getDeviceInfo('iPad_Air_16GB_real', function(err, resp, body) {
        resp.statusCode.should.equal(200);
        done();
      })
    })
  })

  describe('default #Reports', function() {
    it('should Get something', function(done) {
      this.timeout(3000);
      testObject.reports(null, function(err, resp, body) {
        resp.statusCode.should.equal(200);
        done();
      });
    });
  });
});


