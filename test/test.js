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



// const uri = `https://app.testobject.com/api/rest/v1/appium/session/${session_id}/test`; 
// const data = JSON.stringify({ "passed": true });

// var options = {
//   method: 'PUT',
//   url: uri,
//   body: data,
//   headers:{
//     'Content-Type': 'application/json',
//   }
// }