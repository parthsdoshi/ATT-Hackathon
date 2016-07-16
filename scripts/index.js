var path = require('path');
var userName = process.env['USERPROFILE'].split(path.sep)[2];
var watson = require('watson-developer-cloud');
var chokidar = require('chokidar');
var mv = require('mv');
require('./watson_image.js')();
require('./watson_text.js')();
var watcher = chokidar.watch('/Users/' + userName + '/Downloads', {
  ignored: /[\/\\]\./,
  persistent: true,
  depth: 0
});

var alchemy_language = watson.alchemy_language({
  api_key: '9908391a4c1a215d4439bed414a8597a867632da'
});

watcher.on('all', (event, path) => {
  console.log("Event: " + event + " | Path: " + path);
  var arr = path.split('.');
  if (event == "add" && arr[arr.length - 1] == "pdf"){
    console.log(path + " is a pdf. Moving to Documents Folder");
    var movePath = path.split('\\');
    mv(path, '/Users/' + userName + '/Documents/' + movePath[movePath.length - 1], {mkdirp: true}, function(err) {
      if (err){
        console.log(err);
      }
    });
  }

});
