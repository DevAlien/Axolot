var passport = require('passport');

module.exports.checkScopes = function (scopes) {
        return function(req, res, next) {

            passport.authenticate('bearer', {session: false})(req, res, function(err, value) {
                if(err || !scopes) {
                    if(err && err.message == 'jwt malformed') {
                        err.message = 'AccessToken not valid';
                        err.status = 401;
                    }
                    return next(err, value);
                }
                if(scopes) {
                    var token = req.authInfo;
                    for (var i =0; i<token.scopes.length; i++){
                        for (var j=0; j<scopes.length; j++){
                            if(scopes[j] === token.scopes[i]) return next();
                        }
                    }
                    return res.send(401, 'insufficient scopes');
                }

            });
        };
    };