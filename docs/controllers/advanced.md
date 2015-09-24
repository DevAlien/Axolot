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
