function RunCmd(cmd, args, cb) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var result = '';
  child.stdout.on('data', function(data) {
    result += data.toString();
  });
  child.stdout.on('end', function() {
    cb(result)
  });
  child.stderr.on('data', function(data) {
      console.log('Error: \n'+ data);
  });
  child.on('exit',function(code,signal) {
      console.log('Exit: '+code);
  });
}


function test() {
  var shpath = './api.react.mobi.sh';
  RunCmd('sh', [shpath], function(result) {
      console.log(result);
  })
}

test()
