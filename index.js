const http = require('http');
const createHandler = require('github-webhook-handler');

const handler = createHandler({ path: '/webhook', secret: 'myhashsecret' });

http.createServer((req, res) => {
  handler(req, res, (err) => {
    res.statusCode = 404;
    res.end('no such location');
  });
}).listen(7777);

handler.on('error', (err) => {
  console.error('Error:', err.message);
});

handler.on('push', (event) => {
  console.log(
    'Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref
  );

  var shpath = '../' + event.payload.repository.name + '/auto_build2.sh';
  console.log('shpath')
  console.log(shpath)

  RunCmd('sh', [shpath], function(result) {
      console.log(result);
  })
});

handler.on('issues', (event) => {
  console.log(
    'Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title
  );
});

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
