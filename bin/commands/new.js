var program = require('commander');
 var fs = require('fs');
var _ = require('lodash');
var mkdirp = require("mkdirp");
var fs = require('extfs');
var path = require("path");
var getDirName = require("path").dirname
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

var walk = function(dir, fun) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = require("path").join(dir,file);
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) 
            walk(file, fun);
        else 
            fun(file);
    });
}

function writeFile (path, contents, cb) {
    var a = mkdirp.sync(getDirName(path), 0755);
    fs.writeFileSync(path, contents)
}

function write(dest, data) {
    var path = require('path');
    var current = __dirname;
    var folder = path.join(current, '..');
    folder = path.join(folder, 'templates');
    folder = path.join(folder, 'new');

    walk(folder, function(file) {
        var f = file.replace(folder, dest);
        var compiled = _.template(fs.readFileSync(file).toString());
        writeFile(f, compiled(data));
    })
}

function start(name) {
    var current = process.cwd();
    var dest;
    var empty = fs.isEmptySync(current);
    if(empty)
        dest = current;
    else {
        dest = path.join(current, name);
    }
    write(dest, {name: name});
}

program
    .command('new [name]')
    .description('Creates a new project, if the folder is empty it will write in it, if not it will create a new one')
    //.parse(process.argv)
    .action(function(name, options){
        if(name){
            start(name);
        } else {
            var prompt = require("prompt");
            prompt.message = "";
            prompt.delimiter = "";
            prompt.start();

            prompt.get({
                properties: {
                  name: {
                    description: "Project name?",
                    message: 'You must choose a name!',
                    required: true
                  }
                }
            }, function (err, result) {
                if(result) {
                    start(result.name);
                }
                
            });
        }
    })