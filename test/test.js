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
      password: process.env.TEST_OBJECT_SAMPLE_API_KEY
    }
    testObject = new TestObject(config);
  });

  afterEach(function () {
    testObject = null;
  });

  describe('#updateTestStatus', function() {
    it('PUTs updated status', function(done) {
      let status = false;
      testObject.UpdateTestStatus('e492a939-3717-434c-9421-187a4c4a2361', status, function(resp){
        resp.should.equal(204);
        done();
      })
    })
  });
})


