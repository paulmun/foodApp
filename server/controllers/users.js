(function(){
    var mongoose = require('mongoose'),
        User = mongoose.model('User');

    function userController(){

        this.all = function(req, res){
            var users = User.find().exec(function(err, users){
                if (err) {
                    res.json(err);
                }
                res.json(topics);
            });
        }

        this.show = function(req, res){
            var user = User.findOne({_id: req.params.id}, function(err, user){
                if (err) {
                    res.json(err);
                } else {
                    res.json(user);
                }
            });
        }        

        this.create = function(req, res){
            var user = new User({
                name: req.body.name,
                email: req.body.email
            });
            user.save(function(err, data){
                if (err && err.errors.email.kind == 'user defined') {
                    User.findOne({email: req.body.email}, function(err, user){
                            if(err)res.json(err);
                            else{
                            res.json(user);
                            }
                        }
                    );
                } else if(err){
                    res.json(err);
                } else{
                    res.json(data);
                }
            });
        }

        this.update = function(req, res){
            var user = User.findOne({_id: req.params.id}, function(err, user){
                if (err) {
                    res.json(err);
                } else{
                    if (user.name !== req.body.name) {
                        user.name = req.body.name;
                    }
                    if (user.email !== req.body.email) {
                        user.email = req.body.email;
                    }
                    if (user.bio !== req.body.bio) {
                        user.bio = req.body.bio;
                    }
                    if (user.location !== req.body.location) {
                        user.location = req.body.location;
                    }

                    user.save(function(err, data){
                        if (err) {
                            res.json(err);
                        } else {
                            res.json(user);
                        }
                    })
                }
            });
        }

        this.destroy = function(req, res){
            User.findByIdAndRemove(req.params.id, function(err){
                if(err)res.json(err);
                else{
                    res.json(true);
                }
            });
        }

    }

    module.exports = new userController();

})();