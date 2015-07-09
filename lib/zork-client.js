
var childProcess = require('child_process');

var exports = module.exports = {};

var ANSI_REGEX = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

var ZorkClient = exports.ZorkClient = function ZorkClient(onData) {
  this.ready = false;
  var self = this;

  var modulePath = __dirname + '/zork.exp';
  this.expect = childProcess.spawn('expect', [modulePath], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  this.expect.stdout.once('data', function(data) {
    self.ready = true;
  })

  this.expect.stdout.on('data', function(data) {
    var cleanData = data.toString()
      .replace(ANSI_REGEX, '')
      .replace('\r', '\n')
      .trim()
      .replace(/\s{5,}/g, '\n');
    onData && onData(cleanData);
  });

  this.expect.on('close', function() {
    self.ready = false;
  });
};

var send = ZorkClient.prototype.send = function send(cmd) {
  cmd = (cmd.endsWith('\r') || cmd.endsWith('\n')) ? cmd : cmd + '\r';
  this.expect.stdin.writable && this.expect.stdin.write(cmd + '\r');
};

var teardown = ZorkClient.prototype.teardown = function teardown() {
  this.expect.disconnect();
};
