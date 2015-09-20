# Axolot

http://devalien.github.io/Axolot/ for documentation

### Axolot (Another node.js framework?)
I needed something similar to sails.js but that I could update, for example, socket.io and it was much simpler, without having everything out of the box. So I basically took out everything I liked about it and made a smaller version with some different features.

### Get Started
[Basic Tutorial](http://devalien.io/axolot-first-project/)

Axolot comes bundled with a command line tool which can be used to easily create a new project 
```
$ npm install axolot -g
$ axolot new demoproject
$ cd demoproject
```

Once you are in the folder of your project, you will have a simple structure
* api - Folder containing basically all your code (controllers, models, services, etc.)
* config - Folder containing various configuration files
* app.js - Your entry point

To start the app you have 2 different ways use `gulp`, which is good in development since it will restart when you edit a file, or simply use `npm start`

### Models
For the models I choose to use Waterline from the guys of sails.js I find it simple to use and it does the job.
Basically you can add a model inside the folder `api/models`.

Example `api/models/user.js`

```javascript
    module.exports = {

        identity: 'user'
        attributes: {
            username: { type: 'string', required: true },
            password: { type: 'string', minLength: 6, required: true },
            // Lifecycle Callbacks
            beforeCreate: function(values, next) {
                bcrypt.hash(values.password, 10, function(err, hash) {
                    if(err) return next(err);
                    values.password = hash;
                    next();
                });
            }
        }
    };
```

If you don't know how Waterline works you can refer to their documentation: https://github.com/balderdashy/waterline-docs

### Controllers
Controllers is where you define your endpoints (routing). A Controller can be associated with a model, and in this way, the CRUD operations will be there automatically, but you can always override them. Controllers are stored in `api/controllers`

Controllers can also have socket.io methods which are callable from socket.io-client with `controllername:method``

Example `api/controllers/user.js`
```javascript
    module.exports = {
        model: 'user', // We are attaching the user to the model, so CRUD operations are there (good for dev purposes)
        path: '/user', // Tthis is the end point

        actions: {
            'get /': [
                function (req, res) {
                    var query = {};

                    Model.user.find(query).then(function(user) { // Find from the User Model declared above
                        res.send(user);
                    }).catch(function (err){
                        res.send(400, err);
                    });
                }],
        },
        sockets: {
            getSingle: function(userId, cb) { // This one is callable from socket.io using "user:getSingle
                Model.user.findOne(userId).then(function(user) {
                    cb(user)
                }).catch(function (err){
                    cb({error: err})
                });
            }
        }
    };
```
### Services
Services are simply some support objects that can help us doing something. For example we could create a service to  send emails. Services are accessible globally through the variable `Service` and are stored in `api/services`.

Example `api/services/mailer.js` which will be callable from `Service.mailer.send`
```javascript
    var nodemailer = require('nodemailer');

    module.exports = {

        /**
         * Sends an email to a given recipient
         * @method send
         * @param {object}   email           an object containing all of the necessary data to email
         * @param {Function} cb[err, res]    the callback to call once email is sent, or if it fails
         * @return
         */
        send: function (email, cb) {
            var config = this.config;
            /** sets up the modemailer smtp transport */
            var transport = nodemailer.createTransport(config.nodemailer.type, {
                service: config.nodemailer.service,
                auth: {
                    user: config.nodemailer.user,
                    pass: config.nodemailer.pass
                }
            });

            /** sets up the mail options, from and such like that **/
            var from = email.from || 'nobody@nobody.com';
            var subject;
            if (config.nodemailer.prependSubject) {
                subject = config.nodemailer.prependSubject + email.subject;
            } else {
                subject = email.subject;
            }

            var mailOptions = {
                from: email.name + '<' + from + '>',
                to: email.to,
                subject: subject,
                html: email.messageHtml
            };

            /** Actually sends the email */
            transport.sendMail(mailOptions, function (err, response) {
                if (err) return cb(err);
                return cb(null, response);
            });
        }
    };
```

### Config
Configuration can be separated by environments

### CLI
With the CLI you can create new projects and you can access an interactive console, loading your code as well. This is good for testing something and/or debugging.

To generate a new project is pretty easy, after you created it you can mode into that folder (same name of the project) and start coding.
```
$ axolot new projectName
```

To enter in the interactive console, you have to be in the folder of an axolot project. You can select the environment (which is basically the config filename).
```
$ axolot console environment
```

More commands will comoe shortly.

### Support & Contact
You can drop me an email at g@margalho.info or ask a question in StackOverflow or simply open an issue on GitHub.com

More updats will come soon.
