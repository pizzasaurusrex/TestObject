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
TestObject.prototype.updateTest = function(sessionID, status, callback) {
    this.options.url = `https://app.testobject.com/api/rest/v1/appium/session/${sessionID}/test`
    this.options.method = 'PUT';
    this.options.body = JSON.stringify(status);

    this.Send(callback);
};

//set the status of a test as skipped
TestObject.prototype.skipTest = function(sessionID, callback) {
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


//Get allReturns a list of all devices, per data center, including those not currently available for testing
TestObject.prototype.getDevices = function(callback) {
  url = 'https://app.testobject.com/api/rest/v2/devices';
  options = {
    'auth': {
      'user': this.options.username,
      'pass': this.options.apiKey
    }
  }

  this.Auth(url, options,callback);
};


//Get a list of all devices, including those that are currently unavailable for testing. 
//This endpoint requires API Key authentication and will also return your private devices.
TestObject.prototype.getAllDevices = function(callback) {
  url = 'https://app.testobject.com/api/rest/v1/devices/all';
  options = {
    'auth': {
      'user': this.options.username,
      'pass': this.options.apiKey
    }
  }

  this.Auth(url, options, callback);
};

//Get a list of all devices available for testing per dataCenter. This endpoint requires API Key authentication,
// and will also return your private devices.
TestObject.prototype.getAllAvailable = function(callback) {
  url = 'https://app.testobject.com/api/rest/v1/devices/all/available';
  options = {
    'auth': {
      'user': this.options.username,
      'pass': this.options.apiKey
    }
  }

  this.Auth(url, options, callback);
}

//Returns a list per data center containing the IDs of all devices currently available for testing, 
//including private devices. This endpoint requires API Key authentication..
TestObject.prototype.getAvailable = function(callback) {
  url = 'https://app.testobject.com/api/rest/v2/devices/available';
  options = {
    'auth': {
      'user': this.options.username,
      'pass': this.options.apiKey
    }
  }

  this.Auth(url, options, callback);
}

//Retrieve an image of the device based on the device ID. 
//This endpoint requires API Key authentication.
TestObject.prototype.getDeviceImage = function(deviceDescriptorId, callback) {
  url: `https://app.testobject.com/api/rest/v1/devices/images/${deviceDescriptorId}.png`;
  options = {
    'headers': {
      'Accept' : 'image/png'
    },
    'auth': {
      'user': this.options.username,
      'pass': this.options.apiKey
    }
  }

  this.Auth(url, options, callback);
};

//Get a list of popular devices based on region.
TestObject.prototype.getPopular = function(callback) {
  this.options.url = 'https://app.testobject.com/api/rest/v1/devices/popular';
  this.options.method = 'GET';
  this.options.body = null;
  this.options.headers = {};
  this.options.headers.Accept = 'application/json';

  this.Send(callback);
}

//Get a list of device status infos for all device instances with the specified device ID on all pools.
// This endpoint requires API Key authentication and will also return your private devices.
TestObject.prototype.getDeviceStatus = function(deviceDescriptorId, callback) {
  url = `https://app.testobject.com/api/rest/v1/devices/${deviceDescriptorId}/status`;
  options = {
    'auth': {
      'user': this.options.username,
      'pass': this.options.apiKey
    }
  }

  this.Auth(url, options, callback);
}

TestObject.prototype.getDeviceInfo = function(deviceDescriptorId, callback) {
  url = `https://app.testobject.com/api/rest/v2/devices/${deviceDescriptorId}`;
  options = {
    'auth': {
      'user': this.options.username,
      'pass': this.options.apiKey
    }
  }

  this.Auth(url, options, callback);
}


/*
   ,--.        ,---.                ,--.  ,--.   
 ,-|  | ,---. /  .-' ,--,--.,--.,--.|  |,-'  '-. 
' .-. || .-. :|  `-,' ,-.  ||  ||  ||  |'-.  .-' 
\ `-' |\   --.|  .-'\ '-'  |'  ''  '|  |  |  |   
 `---'  `----'`--'   `--`--' `----' `--'  `--'                                                    
*/

TestObject.prototype.reports = function(body, callback) {
  url = 'https://app.testobject.com/api/rest/v1/devices/reports';
  options = {
    'body' : JSON.stringify(body) || null,
    'headers': {
      'Accept':'application/json'
    },
    'auth': {
      'user': this.options.username,
      'pass': this.options.password
    }
  }

  this.Auth(url, options, callback);
};


/*                                                                                        
  ,---.                ,--.                       ,---.          ,--.  ,--.                 
 /  O  \  ,---.  ,---. `--',--.,--.,--,--,--.    '   .-' ,--.,--.`--',-'  '-. ,---.  ,---.  
|  .-.  || .-. || .-. |,--.|  ||  ||        |    `.  `-. |  ||  |,--.'-.  .-'| .-. :(  .-'  
|  | |  || '-' '| '-' '|  |'  ''  '|  |  |  |    .-'    |'  ''  '|  |  |  |  \   --..-'  `) 
`--' `--'|  |-' |  |-' `--' `----' `--`--`--'    `-----'  `----' `--'  `--'   `----'`----'  
         `--'   `--'                                                                        
*/

//Returns the IDs of the devices which you had selected for the specified suite.




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
    callback(err, res, body);
  });
};


TestObject.prototype.Auth = function(url, options, callback) {
  request.get(url, options, function(err, res, body) {
    if (err) {
      console.error('error posting json: ', err);
      throw err
    }
    callback(err, res, body); 
  });
}


module.exports = TestObject;
