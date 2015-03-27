var program = require('commander');
var nodepath = require('path');
var REPL = require('repl');
var fs = require('fs');

program

    .command('console [env]')
    .description('Starts an interactive console')
    .action(function(name, options){
        var current = process.cwd();
        axolotapp = nodepath.join(current, 'app');
        var axolot = require(axolotapp);
        var app = axolot.app;
        function checkState() {
                if(app.started && app.started === true)
                    return load()
                return setTimeout(checkState, 100)
            }

            checkState();
    });

function load() {
    var current = process.cwd();
    var repl = REPL.start('axolot> ');
    try {
      history(repl, nodepath.join(current, '.node_history'));
    } catch (e) {
      console.log('Error finding console history:', e);
    }
    repl.on('exit', function(err) {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      process.exit(0);
    });
}

/**
 * REPL History
 * Pulled directly from https://github.com/tmpvar/repl.history
 * with the slight tweak of setting historyIndex to -1 so that
 * it works as expected.
 */

function history(repl, file) {

  try {
    var stat = fs.statSync(file);
    repl.rli.history = fs.readFileSync(file, 'utf-8').split('\n').reverse();
    repl.rli.history.shift();
    repl.rli.historyIndex = -1;
  } catch (e) {}

  var fd = fs.openSync(file, 'a'),
    reval = repl.eval;

  repl.rli.addListener('line', function(code) {
    if (code && code !== '.history') {
      fs.write(fd, code + '\n');
    } else {
      repl.rli.historyIndex++;
      repl.rli.history.pop();
    }
  });

  process.on('exit', function() {
    fs.closeSync(fd);
  });

  repl.commands['.history'] = {
    help: 'Show the history',
    action: function() {
      var out = [];
      repl.rli.history.forEach(function(v, k) {
        out.push(v);
      });
      repl.outputStream.write(out.reverse().join('\n') + '\n');
      repl.displayPrompt();
    }
  };
}
