var BearerStrategy   = require('passport-http-bearer').Strategy;

// expose this function to our app using module.exports
module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        req.app.models.User.findOne(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new BearerStrategy(
        function(token, done) {
            Service.token.verify(token, function(err, decoded) {
                var info = {};
                if (err) { return done(err); }
                if (!decoded) { return done(null, false); }
                info.scopes = decoded.scopes || [];
                info.group = decoded.group || undefined;
                return done(null, decoded.id, info);
            });
        }
    ));
};