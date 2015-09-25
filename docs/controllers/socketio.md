#Controllers - Socket.io
[Socket.io](http://socket.io) is a widely use library to handle realtime communication with the server. It used websockets, when available, if not fallbacks to long polling and other strategies. This is totally transparent to you and it will also automatically reconnect to the server if, for some reason, loses the connection.

Socket.io is well integrated in Axolot, infact we offer an easy way to handle it.

##How can I use it?
The socket.io is available in the controller as `this.sockets`.

If we want to emit a message to everyone we would simply do.

```
this.socket.emit('alert', { message: 'Scheduled maintenance in 5 minutes' });
```

In the client side we could display a message when a message of type `alert` arrives.

##How can I set listeners?
In socket.io is normal to have server side listeners. so we have integrated them inside the controller. You can define your socket.io endpoints and then access them from the client side and the name will be `controllerName:action`.

We will create a `own` user endpoint and return the user. The controller has another property which is called `sockets` wherre we can define our endpoints there.

```
'use strict'

module.exports = {
    path: '/users,
    model: 'users',
    actions: {
    },
    sockets: {
        own: function(cb) { //cb is sent by the client
            this.model.findOne({ id: this.sockets.user.id }).then(function(user) {
                return cb(user);
            }).catch(function(err) {
                console.log(err);
                return cb(err);
            }
        }
    }
};
```

`this.sockets.user.id` is the user id which is connect to the socket. Check the chapter about Auth for more infos.

So with the above code we have define a socket route `own` inside the controller `users`. From the socket.io client this is callable with something like this

```
socket.on('users:own', function (data) {
    console.log(data);
});
```
