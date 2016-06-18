var fs = require('fs');
var path = require('path');

var directiveStore = path.join(__dirname, '../browser/directiveStore');
var templateURL = path.join(__dirname, '/template.html');

var writeTemplate = function(directiveName) {
  var directiveUrl =  path.join('directiveStore', directiveName, directiveName + '.html');

  return new Promise(function(resolve, reject) {
      fs.readFile(path.join(__dirname, '../browser', directiveUrl), 'utf8', function(err, directiveHTML) {
        if (err)
          reject(err);
        else
          console.log(directiveHTML);
          resolve(directiveHTML);
      })
    })
    .then(function(directiveHTML) {
      return new Promise(function(resolve, reject) {
        fs.readFile(templateURL, 'utf8', function(err, templateHTML) {
          if (err)
            reject(err);
          else
            resolve(templateHTML.replace('{{directiveURL}}', directiveUrl).replace('{{directiveHTML}}', directiveHTML));
        })
      })
    });
};