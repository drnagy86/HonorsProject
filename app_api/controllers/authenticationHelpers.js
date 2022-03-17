const mongoose = require('mongoose')
const Rub = mongoose.model('Rubric');
const User = mongoose.model('User');

const getRubricCreator = (req, res) =>{
    // if (req.payload && req.payload.email){
    //     User
    //         .findOne({email : req.payload.email})
    //         .exec((err, user) => {
    //             if (!user){
    //                 return res
    //                     .status(404)
    //                     .json({
    //                         "message" : "User not found"
    //                     });
    //             } else if (err){
    //                 console.log(err);
    //                 return res
    //                     .status(404)
    //                     .json(err)
    //             }
    //             callback(req, res, user)
    //         });
    // } else {
    //     return res
    //         .status(404)
    //         .json({
    //             "message" : "User not found"
    //         });
    // }
};
const test = (req, res) => {

};

module.exports = {
    //getRubricCreator
    test
}