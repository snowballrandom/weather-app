/**
 * @package    Weather-App
 *
 * @copyright  Copyright (C) 2018 Kyle Coots. All rights reserved.
 * @license    Apache License; see LICENSE file for details.
 */

const request = require('request');

const darksky = {
    
  get: (lat, lng, callback) => {
      
    //console.log('ADDRESS',address); 
    var darkSkyKey = 'Your DarkSky Key';
    var requestAddress = 'https://api.darksky.net/forecast/'+darkSkyKey+'/'+lat+','+lng;
    
    request({
        url: requestAddress,
        json: true
    }, (error, response, body) => {
        
        if(error){

            output.response.error = true;
            output.response.error_msg = {
                default: 'Something went wrong!'+"\n",
                response_error: error    
            };
          
            callback(darksky.res);

        }else{

            switch(response.statusCode){
                case 200:
                  darksky.res = output.ok(error, response, body);
                  callback(darksky.res);
                break;
                case 400, 404:            
                  darksky.res = output.error(error, response, body);
                  callback(darksky.res);
                break;
                default:
                  darksky.res = output.error(error, response, body);  
                  callback(darksky.res);
                break;    
            }
        }
    
    });// End Request
  },
  res: { }
};
var output = {

  error: (error, response, body) => {    

    switch(response.statusCode){
        case 400:          
          output.response.error = true;
          output.response.error_msg = {
              default: 'We recieved a bad response is all we know.',
              response_status: response.statusCode,
              response_message: body.error_message
          };
          return output.response;
            break;
        case 404:
          output.response.error = true;
          output.response.error_msg = {
              default: 'We recieved a bad response is all we know.',
              response_status: response.statusCode
          };
          return output.response;
            break;
        default:
          output.response.error = true;
          output.response.error_msg = {
              default: 'Not Sure What happen!',
              response_status: response.statusCode
          };
          return output.response;
            break;
    }    
  },    
  ok: (error, response, body) => {    

    switch(response.statusCode){
        case 200:

          output.response.data.currently = body.currently;
          output.response.data.minutely = body.minutely;
          output.response.data.hourly = body.hourly;
          output.response.data.daily = body.daily;
          output.response.data.flags = body.flags;
          
          return output.response;

            break;
        default:

          output.response.error = true;
          output.response.error_msg = {
              default: 'We recieved a bad response is all we know.',
              response_status: body.status,    
              response_message: body.error_message
          };

          return output.response;

            break;
    }

  },
  response: {
      error: false,
      error_msg: '',
      data: {
          currently: {},
          minutely: {},
          hourly: {},
          daily: {},
          flags: {}
      }
  }

};// End Output


module.exports = darksky;
