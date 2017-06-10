const request = require('request');
const utils   = require('./utils');

const extend  = utils.extend;
const replace = utils.replace;

/*                                                                                                                                                                     
,--------.                   ,--.        ,-----.  ,--.      ,--.                  ,--.   
'--.  .--'  ,---.   ,---.  ,-'  '-.     '  .-.  ' |  |-.    `--'  ,---.   ,---. ,-'  '-. 
   |  |    | .-. : (  .-'  '-.  .-'     |  | |  | | .-. '   ,--. | .-. : | .--' '-.  .-' 
   |  |    \   --. .-'  `)   |  |       '  '-'  ' | `-' |   |  | \   --. \ `--.   |  |   
   `--'     `----' `----'    `--'        `-----'   `---'  .-'  /  `----'  `---'   `--'                                                             '---'                                            
*/

const DEFAULTS = {
  username:  null,
  password:  null,
  method: null,
  url: null,
  body: {},
  headers: null
};


class TestObject {
  constructor(options) {
    this.options = extend({}, DEFAULTS, options)
  }
}

/*                       
  ,---.   ,------.  ,--. 
 /  O  \  |  .--. ' |  | 
|  .-.  | |  '--' | |  | 
|  | |  | |  | --'  |  | 
`--' `--' `--'      `--' 
*/


//update the status of a test as passed or failed
TestObject.prototype.UpdateTestStatus = function(sessionID, status, callback) {
    this.options.url = `https://app.testobject.com/api/rest/v1/appium/session/${sessionID}/test`
    this.options.method = 'PUT';
    this.options.body = JSON.stringify({"passed":status});
    this.options.headers = {
      'Content-Type': 'application/json',
    };
    this.Send(callback);
    return;
};


TestObject.prototype.Send = function(callback) {
   request(this.options, function(err, res, body) {
    if (err) {
      console.error('error posting json: ', err);
      throw err
    }
    var headers = res.headers
    var statusCode = res.statusCode
    callback(statusCode);
  });
};

module.exports = TestObject;

