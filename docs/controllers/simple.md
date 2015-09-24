#Controller - Simple
A controller is basically the entry point (and exit point) of your code for a request, this means that when a request (HTTP) comes in it will go in the defined route and then just a this point you can interact with it. 

As said above, a controller defines a set or routes, for example `GET /users` in REST style you will know that calling that will return you a list of users.

The Controllers in axolot have different features so I decided to separate a little bit the documentation, here we will see just the easy step.

##Hot to create a route and a controller
First of all we have to create a controller file. All controllers are loaded automatically by the framework and they should be located at `./api/controllers`. 

At this point we will create our first controller called `users` so let's create the file `./api/controllers/users.js` which will look like this.
```
'use strict';

module.exports = {
    path: '/users', //Defines the base route

    actions: {
        'get /': [ //This is our definition of the route
            function (req, res) {
                var users = [{name: 'John'}, {name: 'Jimmy'}];
                res.send(users);
            }
        ]
    }
};
```

With the above controller we have defined a route in our API which looks like `/users`. If you are in your local environment you just start the API, point to http://localhost:3000/users (Change the port if you do not use the default one) and you should get `[{name: 'John'}, {name: 'Jimmy'}]`.

As you see in the example above we put `get` before the `/` this mean that just GET (HTTP) requests are accepted in this route. We can define others, like `PUT` `POST` `DELETE` `PATCH` etc.

##A more complex controller to show different actions
I will make a working API without the database, so I will use a variable to store the users outside the controller.

```
'use strict';
var users = [{name: 'John'}, {name: 'Jimmy'}]; //Our users datasource

module.exports = {
    path: '/users', //Defines the base route

    actions: {
        'get /': [ //This will return all the users we have
            function (req, res) {
                res.send(users);
            }
        ],
        'get /:id': [ //Here we get a single user by id
            function (req, res) {
                res.send(users[req.params.id]);
            }
        ],
        'post /': [ //To create a user
            function (req, res) {
                users.push(req.body);
                res.send(req.body);
            }
        ],
        'put /:id': [ //To edit a user
            function (req, res) {
                users[req.params.id] = req.body; //req.params you can access the id which is defined in the route, it can be any character as the id
                res.send(req.body);
            }
        ],
        'delete /:id': [ //To delete a certain user
            function (req, res) {
                users.splice(req.params.id, 1);//Removes that id from the array
                res.send(users);
            }
        ]
    }
};
```

All the above routes are callable like this
* `GET /users` This will return every single user which is saved
* `GET /users/1` This will return the user at the position 1 of the datasource, which is `{name: 'Jimmy'}`
* `POST /users` This will create a new user
* `PUT /users/1` This will modify our user at position 1
* `DELETE /users/1` This will delete our poor Jimmy :(