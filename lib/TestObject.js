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
  apiKey: null,
  password:  null,
  method: null,
  url: null,
  body: {},
  headers: {'Content-Type': 'application/json'}
};


class TestObject {
  constructor(options) {
    this.options = extend({}, DEFAULTS, options);
  }
}

/*                       

                                                                                                                      
  ,---.                   ,--.                         ,--.   ,--.            ,--.          ,--.                      
 /  O  \   ,---.   ,---.  `--' ,--.,--. ,--,--,--.     |  |   |  |  ,--,--. ,-'  '-.  ,---. |  ,---.   ,---.  ,--.--. 
|  .-.  | | .-. | | .-. | ,--. |  ||  | |        |     |  |.'.|  | ' ,-.  | '-.  .-' | .--' |  .-.  | | .-. : |  .--' 
|  | |  | | '-' ' | '-' ' |  | '  ''  ' |  |  |  |     |   ,'.   | \ '-'  |   |  |   \ `--. |  | |  | \   --. |  |    
`--' `--' |  |-'  |  |-'  `--'  `----'  `--`--`--'     '--'   '--'  `--`--'   `--'    `---' `--' `--'  `----' `--'    
          `--'    `--'                                                                                                

*/


//update the status of a test as passed or failed
TestObject.prototype.UpdateTestStatus = function(sessionID, status, callback) {
    this.options.url = `https://app.testobject.com/api/rest/v1/appium/session/${sessionID}/test`
    this.options.method = 'PUT';
    this.options.body = JSON.stringify(status);

    this.Send(callback);
};


//set the status of a test as skipped
TestObject.prototype.SkipTest = function(sessionID, callback) {
  this.options.url = `https://app.testobject.com/api/rest/v1/appium/session/${sessionID}/skiptest`;
  this.options.method = 'PUT';
  this.options.body = null;
  this.options.headers.Accept = 'application/json';

  this.Send(callback);
};


/*
  ,---.                       ,--. ,--.          ,--.    ,--.             ,------.                      ,--.                        
 /  O  \  ,--.  ,--.  ,--,--. `--' |  |  ,--,--. |  |-.  |  |  ,---.      |  .-.  \   ,---.  ,--.  ,--. `--'  ,---.  ,---.   ,---.  
|  .-.  |  \  `'  /  ' ,-.  | ,--. |  | ' ,-.  | | .-. ' |  | | .-. :     |  |  \  : | .-. :  \  `'  /  ,--. | .--' | .-. : (  .-'  
|  | |  |   \    /   \ '-'  | |  | |  | \ '-'  | | `-' | |  | \   --.     |  '--'  / \   --.   \    /   |  | \ `--. \   --. .-'  `) 
`--' `--'    `--'     `--`--' `--' `--'  `--`--'  `---'  `--'  `----'     `-------'   `----'    `--'    `--'  `---'  `----' `----'  
*/


//Get allReturns a list of all devices, including those not currently available for testing
TestObject.prototype.GetDevices = function(callback) {
  this.options.url = 'https://app.testobject.com/api/rest/v1/devices';
  this.options.method = 'GET';
  this.options.body = null;
  this.options.headers = {};
  this.options.headers.Accept = 'application/json';

  this.Send(callback);
};


//Get a list of all devices, including those that are currently unavailable for testing. 
//This endpoint requires API Key authentication and will also return your private devices.
TestObject.prototype.GetAllDevices = function(callback) {
  url = 'https://app.testobject.com/api/rest/v1/devices/all';
  options = {
    'auth': {
      'user': this.options.username,
      'pass': this.options.apiKey
    }
  }

  this.Auth(url, options, callback);
};

//Get a list of all devices available for testing. This endpoint requires API Key authentication,
// and will also return your private devices.
TestObject.prototype.GetAllAvailableDevices = function(callback) {
  url = 'https://app.testobject.com/api/rest/v1/devices/all/available';
  options = {
    'auth': {
      'user': this.options.username,
      'pass': this.options.apiKey
    }
  }

  this.Auth(url, options, callback);
}


//Get a list of all devices available for testing.
TestObject.prototype.GetAvailable = function(callback) {
  this.options.url = 'https://app.testobject.com/api/rest/v1/devices/available';
  this.options.method = 'GET';
  this.options.body = null;
  this.options.headers = {};
  this.options.headers.Accept = 'application/json';

  this.Send(callback);
}


/*                                                        
,--.  ,--.         ,--.                                 
|  '--'  |  ,---.  |  |  ,---.   ,---.  ,--.--.  ,---.  
|  .--.  | | .-. : |  | | .-. | | .-. : |  .--' (  .-'  
|  |  |  | \   --. |  | | '-' ' \   --. |  |    .-'  `) 
`--'  `--'  `----' `--' |  |-'   `----' `--'    `----'  
                        `--'                            
*/

TestObject.prototype.Send = function(callback) {
   request(this.options, function(err, res, body) {
    if (err) {
      console.error('error posting json: ', err);
      throw err
    }
    callback(res, body);
  });
};


TestObject.prototype.Auth = function(url, options, callback) {
  request.get(url, options, function(err, res, body) {
    if (err) {
      console.error('error posting json: ', err);
      throw err
    }
    callback(res, body); 
  });
}


module.exports = TestObject;
