/*
Make the URL class global like it is in the browser runtime.
It should be global in Node as well.
*/
global.URL = require('url').URL
