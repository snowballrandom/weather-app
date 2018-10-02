/**
 * @package    Weather-App
 *
 * @copyright  Copyright (C) 2018 Kyle Coots. All rights reserved.
 * @license    Apache License; see LICENSE file for details.
 */

const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./darksky/darksky');

const argv = yargs
        .options({
            a: {
                demand: true,
                alias: 'address',
                describe: 'Address to fecth weather for',
                string: true
            }
        })
        .help()
        .alias('help', 'h')
        .argv;

geocode.get(argv.address, (results)=>{    
  weather.get(results.data.latitude, results.data.longitude, (res) => {
    console.log(res);
  });    
});



