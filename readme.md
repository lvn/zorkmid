# zorkmid
### by [Elvin Yung](https://github.com/elvinyung)

Botstrap plugin for playing Zork from Slack.

Kinda hacky. The core of the plugin basically spawns child processes running `expect`, which spawns a child process running `zork1`, and then does a bunch of string manipulation to remove all the ANSI escape codes and extraneous spaces from stdout.

### Instructions
Install Zork. (I got it from [here](https://github.com/wjwwood/homebrew-zork).)

Sample bot using `zorkmid`:
```javascript
var botstrap = require('botstrap');

var config = getConfigSomehow();
botstrap.createBot(config);

botstrap.command('zork', require('zorkmid'));
```
