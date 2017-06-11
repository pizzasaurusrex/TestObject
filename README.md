# node-testobject 

Wrapper around the Test Object REST API for [Node.js](http://nodejs.org/).

## Install

```shell
npm install TestObject
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

- Sean Enright ([Sean ENright](https://github.com/pizzasaurusrex))


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
