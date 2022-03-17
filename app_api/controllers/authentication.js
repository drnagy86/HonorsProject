const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');


const login = (req, res) => {
    if (!req.body.email || !req.body.password){
        return res
            .status(400)
            .json({
                "message" : "All fields required"
            });
    }
    passport.authenticate('local', (err, user, info) => {
        let token;
        if (err){
            return res
                .status(404)
                .json(err);
        }
        if (user){
            token = user.generateJwt();
            res
                .status(200)
                .json({token});
        } else {
            res
                .status(401)
                .json(info);
        }
    })(req, res);
};

const register = (req, res) => {
    if( !req.body.email || !req.body.givenName || !req.body.familyName || !req.body.password) {
        return res
            .status(400)
            .json({
                "message": "All fields required"
                // "email" : req.body.email,
                // "givenName" : req.body.givenName,
                // "familyName" : req.body.familyName,
                // "password" : req.body.password
        });

        // console.log({
        //         "message": "All fields required",
        //         "email" : req.body.email,
        //         "givenName" : req.body.givenName,
        //         "familyName" : req.body.familyName,
        //         "password" : req.body.password
        //     }
        // );
    }
    const user = new User();
    user.givenName = req.body.givenName;
    user.familyName = req.body.familyName;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save((err) => {
        if (err){
            res
                .status(404)
                .json(err);
        } else {
            const token = user.generateJwt();
            res
                .status(200)
                .json({token});
        }
    });
};

module.exports = {
    login,
    register
}