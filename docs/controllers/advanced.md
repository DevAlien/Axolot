#Controler - Advanced
By now you should know already what a controller is and how to use it. Here we are going to use some special features.

##Multiple functions in one route
As you may have seen in the `Controllers - Simple` section, there's an array defining the route, this is because we can add multiple functions to a single route. It can be useful for authentication, or for an action that it get's repeated in many places. You can create a function which looks like `function(req, res, next)` and in the first function that you call you have to remember to call the callback `next` like `next()`. This is needed so express knows that it has to go to the next function.

As an example we can suppose that to use `/users` of the API you need an header `Authorization` with `testAxolot` as data.

Our function to check if it has the header with that value will look like the following

```
function(req, res, next) {
    if(req.get('Authorization') === 'testAxolot') {
        next(); //If it has the header with testAxolot it can go to the next function
    } else {
        res.send(401, 'Unauthorized'); // If does not have it return 401 Unauthorized
    }
}
```

Now we can implement it in our code.

```
'use strict';
var users = [{name: 'John'}, {name: 'Jimmy'}]; //Our users datasource
var auth = function(req, res, next) {
    if(req.get('Authorization') === 'testAxolot') {
        next(); //If it has the header with testAxolot it can go to the next function
    } else {
        res.send(401, 'Unauthorized'); // If does not have it return 401 Unauthorized
    }
};

module.exports = {
    path: '/users', //Defines the base route

    actions: {
        'get /': [ //This will return all the users we have
            auth,
            function (req, res) {
                res.send(users);
            }
        ],
        'get /:id': [ //Here we get a single user by id
            auth,
            function (req, res) {
                res.send(users[req.params.id]);
            }
        ],
        'post /': [ //To create a user
            auth,
            function (req, res) {
                users.push(req.body);
                res.send(req.body);
            }
        ],
        'put /:id': [ //To edit a user
            auth,
            function (req, res) {
                users[req.params.id] = req.body; //req.params you can access the id which is defined in the route, it can be any character as the id
                res.send(req.body);
            }
        ],
        'delete /:id': [ //To delete a certain user
            auth,
            function (req, res) {
                users.splice(req.params.id, 1);//Removes that id from the array
                res.send(users);
            }
        ]
    }
};
```

Now every route will execute 2 functions, the `auth` function and the normal function like before. Obviously the second function it is called just when the auth is ok.

##Attaching a model
A model can be accessed with the global variable `Model` or can be called set in the controller.

> To call a model using the global variable you just have to do `Model.users.find()...` and you can try this out in the console running the axolot command `axolot console`.

But now we want to use the built in functionality of the controller. We will attach a model `users` to the controller users. (we will use a reduced version of the controller used until now).

```
'use strict';


module.exports = {
    path: '/users', //Defines the base route
    model: 'users', //This will load our model into the controller
    actions: {
    }
};
```

Defining the model gives us some good free functionality. We will have the CRUD operations for free. Just try to `POST /users` `GET /users` `GET /users/1` etc. This is very good for development.

Passing the model to the controller it will give you access to it directly by using `this.model`. You can access this from your routes.