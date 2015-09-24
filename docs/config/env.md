#Environment Config
In today's tech world we are always working in different environments, local, heroku, aws, bluemix, etc. And sometimes, handling env variables is not how you want to handle configuration variables.
In axolot you can have different config files, one for each env tht you wish.

##Config location
All the config files are located inside the `./config` folder.

##How to choose the different configs
Let's suppose you have 2 different config files `./config/development.js` for development and `./config/production.js` for production. (This is the config we recommend)

you can simply set the environment variable in your system called NODE_ENV with the following command `export NODE_ENV=production` this will set the variable until next login. In the above case it will load the `./config/production.js` configuration.

> If NODE_ENV is not set it will fallback to `development`

##Default configs
By default, when you create a new axolot project with the CLI, 2 config files will be created. (Below the generated files with some comments)
```
var rootPath = require('path').normalize(__dirname + '/..');

exports.app = { //Vars needed for startup
    root: rootPath, //Project's root folder
    name: 'testproject', //Name of the project
    port: process.env.PORT || 3000 //Port which will be used for your server
};

exports.secrets = { //Used for JWT token generation
    token: 'NOTSOSECRET'
};

// Waterline ORM configuration
var mongoAdapter = require('sails-mongo');

exports.orm = {
    adapters: {
        'mongo': mongoAdapter
    },
    connections: {
        'default': {
            adapter: 'mongo',
            host: 'localhost',
            database: 'testproject'
        }
    },
    defaults: {
        migrate: 'safe'
    }
};
```
With the default file you should be able to just run your API with the standard config.

##How to add new config params
Let's suppose we have to add a job to a queue in Amazon SQS when receiving a request. We need the AWS credentials to access it.

To the configuration file, the one above, we can export a new Object with what is needed. We will append the following snippet to the bottom of the file `./config/development.js`.

```
exports.sqs = {
	accessKey: process.env.SQS_ACCESSKEY || 'MYACCESSKEY',
	privateKey: process.env.SQS_PRIVATEKEY || 'MYPRIVATEKEY',
	region: process.env.SQS_REGION || 'eu-west-1',
	queueURL: process.env.SQS_URL || 'https://sqs.eu-west-1.amazonaws.com/ID/QUEUEID'
};
```

##How to access config params from a file
Of course when we add a configuration parameter we need to use it in our app, but how do we select the right file and which environment we must use axolot config, since it started the app and knows which file is loaded.

With the following snippet we will have the sqs accessKey set in the snippet above.

```
var config = require('axolot/config/config');
console.log(config.sqs.accessKey); //MYACCESSKEY
```
