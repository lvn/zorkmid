var ZorkClient = require('./zork-client').ZorkClient;

var zork;

clients = {};

var BANNED_WORDS = new Set(['quit']);

module.exports = function zorkCmd(argv, response, channel) {
  var words = argv.slice(1);
  for (var i in words) {
    if (BANNED_WORDS.has(words[i])) {
      return;
    }
  }

  clients[channel.id] = clients[channel.id] || new ZorkClient(function(data) {
    data.length > 0 && channel.send(data);
    response.end('Starting up Zork client...');
  });

  var cmd = words.join(' ');
  clients[channel.id].send(cmd);
};
