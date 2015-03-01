var checkScopes = require('./helper').checkScopes;
// A controller that all others can inherit from

module.exports = {

    actions: {
        // Search
        'get /': function (req, res, next) {
            this.model.find().exec(function (err, modelsFound) {
                if (err) return res.json(500, {err: err});
                res.json(modelsFound);
            });
        },
        // Create
        'post /': [
            checkScopes(),
            function (req, res, next) {
                var data = req.body;
                data.group = req.authInfo.group; //inject group to the data, everything we create it must always have the group

                this.model.create(data).then(function (modelCreated) {
                    res.json(201, modelCreated);
                }).catch(function(err) {
                    return res.json(500, {err: err});
                });
            }],
        // Read
        'get /:id': function (req, res, next) {
            this.model.findOne({id: req.params.id}, function (err, modelFound) {
                if (err) return res.json(500, {err: err});
                res.json(modelFound);

            });
        },
        // Update
        'put /:id': function (req, res, next) {
            // Don't pass ID to update
            delete req.body.id;

            this.model.update({id: req.params.id}, req.body, function (err, modelUpdated) {
                if (err) return res.json(500, {err: err});
                res.json(modelUpdated);
            });
        },
        // Delete
        'delete /:id': function (req, res, next) {
            this.model.destroy({id: req.params.id}, function (err) {
                if (err) return res.json(500, {err: err});
                res.json({status: 'ok'});
            });
        }
    },

    sockets: {

    }
};


