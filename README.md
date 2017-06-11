# node-testobject 

Wrapper around the Test Object REST API for [Node.js](http://nodejs.org/).

## Install

```shell
npm install testobject_api
```

## Test

To run the test suite, first invoke the following command within the repo, installing the development dependencies:

```shell
npm install
```

Then run the tests:

```shell
npm test
```

## Authors

- Sean Enright ([Sean Enright](https://github.com/pizzasaurusrex))


## Writing a script

```javascript
var TestObject = require('TestObject');

var myAccount = new TestObject({
  username: "your-TestObject-username",
  apiKey: "your-test-object-api-key",
  password: "your-test-object-password"
});

```

## Supported Methods

<table>
  <thead>
    <tr>
      <th width="50%">REST</td>
      <th width="50%">Node Wrapper</td>
    </tr>
  </thead>
  <tbody>
    <tr>
       <td>
         PUT appium/session/${sessionID}/test <br />
         Update the status of a test as passed or failed
       </td>
       <td>
         updateTest(sessionID, status, cb) -> cb(err, res, body) 
       </td>
     </tr>
      <tr>
       <td>
         PUT appium/session/${sessionID}/test/skiptest <br />
         Update the test status to skipped
       </td>
       <td>
         skipTest(sessionID, cb) -> cb(err, res, body) 
       </td>
     </tr>
     <tr>
       <td>
         GET /devices <br />
         Get allReturns a list of all devices, including those not currently available for testing
       </td>
       <td>
         getDevices(cb) -> cb(err, res, body) 
       </td>
     </tr>
     <tr>
       <td>
         GET /devices/all <br />
         Get a list of all devices, including those that are currently unavailable for testing. 
         This endpoint requires API Key authentication and will also return your private devices.
       </td>
       <td>
         getAllDevices(cb) -> cb(err, res, body) 
       </td>
     </tr>
     <tr>
       <td>
         GET /devices/all/available <br />
         Get a list of all devices available for testing. This endpoint requires API Key authentication, and will also return your private devices
       </td>
       <td>
         getAllAvailable(cb) -> cb(err, res, body) 
       </td>
     </tr>
     <tr>
       <td>
         GET /devices/available <br />
         Get a list of all devices available for testing.
       </td>
       <td>
         getAvailable(cb) -> cb(err, res, body) 
       </td>
     </tr>
     <tr>
       <td>
         GET devices/popular <br />
         Get a list of popular devices based on region.
       </td>
       <td>
         getPopular(cb) -> cb(err, res, body) 
       </td>
     </tr>
  </tbody>
</table>

## More documentation

Check out the [Test Object Rest API](https://api.testobject.com/) for more information.

## License

Copyright (c) 2017 Sean Enright

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
