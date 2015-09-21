#CLI
Axolot has a built in CLI to give us some useful tools. These CLI commands will grow with every release. Automation is the way!

##Introduction

Executing the command `axolot` will show  the help for the CLI.

```
$ axolot

  Commands:

    new [name]     Creates a new project, if the folder is empty it will write in it, if not it will create a new one
    console [env]  Starts an interactive console

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

  Examples:

    $ axolot new myproj
    $ axolot console development
```

By default it just displays the help.

Below you will find more accurate description for each command. To execute a command just type `axolot [command]`.

##Command `new`
When we want to create or start a new axolot project we can just use this command which basically creates you a folder, named as the name of the project, plus all the default file structure.

After creating a project, we have to go inside the project folder, run `npm install` and then you are ready to go with `gulp` or `npm start``

```
$ axolot new testproject
$ cd testproject
$ npm install
$ gulp
```

After this you will have a "working" API and you are ready to go.

##Command `console`
With NodeJs we can easily create REPL, basically the console when you type `node` in your terminal, and can be used to do some cool stuff.

This command will enter you in a kind of "interactive mode" which can be useful to test some component you wrote or test/use the model, to add some dummy data into the DB for example.

> This command MUST be run inside the project's folder!

So from our `testproject` folder we run the following command and we will be in our interactive console.

```
$ axolot console
```

You can even define the environment for the console. This means, that in your project, you can have different environments, for example `development` and `production`

You can pass it as an optional parameter to that command, like below.
```
$ axolot console production
```
