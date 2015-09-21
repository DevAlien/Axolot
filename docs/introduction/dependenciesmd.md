
# Dependencies

I decided to use some dependencies instead of other ones. I will list here few of them so that you know better the choices.

###[ExpressJS](http://expressjs.com/)
I choose express because I was most comfortable with, because it is widely used and because it is well supported by the community.

###[Socket.io](http://socket.io)
Same as the above, I decided to use it because version 1.x as all the features I needed and I always been using it since I started with node, but this component is easily switchable.

###[Waterline](https://github.com/balderdashy/waterline)
Waterline, since I first used it with sails.js, I thought it was a must have for any project I needed a database or datasource. The cool thing about Waterline is that it supports many many different databases. Waterline works with adapters, and it is *fairly* easy to create new adapters.

###[JWT](http://jwt.io)
I used JWT because I find it cool and it is becoming quite a standard for access tokens. JWT is basically used for the authentication with scopes. I got the idea from here https://auth0.com/blog/2014/12/02/using-json-web-tokens-as-api-keys/