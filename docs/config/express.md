#Express config
Axolot, like many other, is based on express. Express is widely used and very supported. Axolot does not want to hide express, but wants to give you the chance to use it and use the power that comes with it.

Express has [middlewares](http://expressjs.com/guide/using-middleware.html), you can set [template engines](http://expressjs.com/guide/using-template-engines.html) (which there's an example on how to add one) and many other things.


#How to use the config
This is very simple in the `./config` directory there's a file `express.js` which, if it exists, it is called before the app/API starts.

The file looks like this
```
module.exports = function (app, config) {
   
};
```
`app` is the variable which reffers to express

`config` is the config.app which is defined in the environment config


#Small example on how to use it.
For example we want to enable the cross origin, because we are building an API which is used by a browser which makes AJAX calls.

```
module.exports = function (app, config) {
    var allowCrossDomain = function(req, res, next) {
        var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With', 'Authorization', 'content-type', 'headers', 'method'];
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));

        next();
    }

    app.use(allowCrossDomain);
};
```
Of course this is just an example, here you can fit everything express has to offer.
