const mongoose = require('mongoose')
const Rub = mongoose.model('Rubric');
const User = mongoose.model('User');
// With your basic controller, you need to trap three errors:
//     The request parameters don’t include locationid.
//     The findById() method doesn’t return a location.
//     The findById() method returns an error.

const rubricsList = (req, res) => {
    Rub
        .find()
        .exec((err, rubrics) => {
            if (!rubrics) {
                return res
                    .status(404)
                    .json({
                        "message": "no rubrics found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            res
                .status(200)
                .json(rubrics.filter(isActive));
        })
};

const rubricCreate = (req, res) => {

    //res = getRubricCreator(req, res);
    //console.log(res);
    if (res.status === '404') {
        return res;
    } else if (!req.body.name || !req.body.description) {
        return res
            .status(400)
            .json({
                "message": "Missing name or description"
            });
    } else {

        Rub
            .create({
                    "name": req.body.name,
                    "description": req.body.description,
                    // "rubricCreator" : req.payload.email,
                    "rubricCreator": req.body.rubricCreator,
                }
                , (err, rubric) => {
                    if (err) {
                        console.log(rubric);
                        return res
                            .status(400)
                            .json(err)
                    } else {
                        return res
                            .status(201)
                            .json(rubric);
                    }
                });
    }

};
const rubricReadOne = (req, res) => {
    Rub
        .findById(req.params.rubricid)
        .exec((err, rubric) => {
            //The findById() method doesn’t return a location.
            if (!rubric) {
                return res
                    .status(404)
                    .json({
                        "message": "rubric not found"
                    });
                //The findById() method returns an error.
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            res
                .status(200)
                .json(rubric)
        });

};
const rubricUpdateOne = (req, res) => {
    Rub
        .findById(req.params.rubricid)
        .exec((err, rubric) => {
            const {
                old_name,
                old_description,
                new_name,
                new_description
            } = req.body;

            if (rubric.name === old_name && rubric.description === old_description) {
                rubric.name = new_name;
                rubric.description = new_description;
                rubric.dateUpdated = new Date(Date.now());
                rubric.save((err, rub) => {
                    if (err) {
                        res
                            .status(404)
                            .json(err)
                    } else {
                        res
                            .status(200)
                            .json(rub);
                    }
                });
            } else {
                res
                    .status(404)
                    .json({
                        "message": "Unable to update because record has changed since starting edit"
                    });
            }
        })
    ;
};

const rubricDeactivate = (req, res) =>{
    // return res
    // .status(200)
    // .json({
    //     "message": "worked"
    // });
    const {rubricid} = req.params;
    if (rubricid){
        // see if it is in the db
        Rub
            .findById(rubricid)
            .exec((err, rubric) =>{
                rubric.active = false;
                rubric.save((err, rub) => {
                    if (err) {
                        res
                            .status(404)
                            .json(err)
                    } else {
                        res
                            .status(200)
                            .json(rub);
                    }
                });
        });

    } else {
        res.status(404)
            .json({
                "message": "no rubric"
            });
    }
}

const rubricDeleteOne = (req, res) => {
    const {rubricid} = req.params;
    if (rubricid) {
        Rub
            .findByIdAndRemove(rubricid)
            .exec((err, rubric) => {
                if (err) {
                    return res
                        .status(404)
                        .json(err);
                }
                res
                    .status(204)
                    .json(null);
            });
    } else {
        res.status(404)
            .json({
                "message": "no rubric"
            });
    }
};

const getRubricCreator = (req, res) => {
    if (req.payload && req.payload.email) {
        User
            .findOne({email: req.payload.email})
            .exec((err, user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({"message": "User not found"});
                } else if (err) {
                    return res
                        .status(404)
                        .json(err);
                } else {
                    return res
                        .status(200)
                        .json(user)
                }
            });
    } else {
        return res
            .status(404)
            .json({"message": "User not found"});
    }
};

const isActive = (rubric) => {
    return rubric.active === true;
};

module.exports = {
    rubricsList,
    rubricCreate,
    rubricReadOne,
    rubricUpdateOne,
    rubricDeleteOne,
    rubricDeactivate
}