'use strict';
module.exports = {
    path: '/books',
    actions: {
        'get /': [
            function (req, res) {
                res.send({message: 'Books listing is not implemented yet!'})
            }],
    }
};
