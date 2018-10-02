/**
 * @package    Weather-App
 *
 * @copyright  Copyright (C) 2018 Kyle Coots. All rights reserved.
 * @license    Apache License; see LICENSE file for details.
 */

const request = require('request');

const geocode = {
    
  get: (address, callback) => {
      
    //console.log('ADDRESS',address); 
    
    var encodedAddress = encodeURIComponent(address);
    var apiKey = 'Your Google App Key';
    var requestAddress = 'https://maps.googleapis.com/maps/api/geocode/json?key='+apiKey+'&address='+encodedAddress;
        
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
            
            callback(geocode.res);

        }else{

            switch(response.statusCode){
                case 200:
                  geocode.res = output.ok(error, response, body);
                  callback(geocode.res);
                break;
                case 400, 404:            
                  geocode.res = output.error(error, response, body);
                  callback(geocode.res);
                break;
                default:
                  geocode.res = output.error(error, response, body);  
                  callback(geocode.res);
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

    switch(body.status){
        case 'OK':

          output.response.data.address = body.results[0].formatted_address;
          output.response.data.latitude = body.results[0].geometry.location.lat;
          output.response.data.longitude = body.results[0].geometry.location.lng;

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
          address: '',
          latitude: '',
          longitude: ''
      }
  }

};// End Output


module.exports = geocode;
