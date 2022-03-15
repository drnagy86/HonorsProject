const mongoose = require('mongoose')
const Rub = mongoose.model('Rubric');

// With your basic controller, you need to trap three errors:
//     The request parameters don’t include locationid.
//     The findById() method doesn’t return a location.
//     The findById() method returns an error.

const rubricsList = (req,res) => {

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
                .json(rubrics);
        })
};
const rubricCreate = (req,res) => {
    Rub
        .create({
            "name" : req.body.name,
            "description": req.body.description,
            "rubricCreator" : req.body.rubric_creator,
            // another call maybe? or subject is an array and for each subject in array?
            // subjects : [
            //     res.body.subjects.forEach( s => {
            //         subject_id : s
            //     })
            // ]
            //
            // "subjects" : [{
            //     "subject_id" : req.body.subject_id
            // }]
    }
    , (err, rubric) => {
        if (err){
            // return res
                // .status(400)
                // .json(
                //     {
                //         "name" : req.body.name,
                //         "description": req.body.description,
                //         "rubricCreator" : req.body.rubric_creator,
                //         // another call maybe? or subject is an array and for each subject in array?
                //         // subjects : [
                //         //     res.body.subjects.forEach( s => {
                //         //         subject_id : s
                //         //     })
                //         // ]
                //         //
                //         // "subjects" : [{
                //         //     subject_id : req.body.subject_id
                //         // }]
                //     }
                // )
            return res
                .status(400)
                .json(err)
        } else {
            //return res.status(200).json({"message": "hey"})
            return res
                .status(201)
                .json(rubric);
        }
    });
};
const rubricReadOne = (req,res) => {
    Rub
        .findById(req.params.rubricid)
        .exec((err, rubric) =>{
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
const rubricUpdateOne = (req,res) => {

    if (!req.params.rubricid){
        return res
            .status(404)
            .json({
                "message" : "Not found, rubricid is required"
            });
    }
    else {
        res
            .status(200)
            .json({
                "message" : "madf"
            });
    }
    Rub
        .findById(req.params.rubricid)
        .exec((err, rubric) => {

            const {
                old_name,
                old_description,
                new_name,
                new_description
            } = req.body;

            if (rubric.name === old_name && rubric.description === old_description){
                rubric.name = new_name;
                rubric.description = new_description;
                rubric.save((err, rub) => {
                    if(err){
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
                        "message" : "Unable to update because record has changed since starting edit"
                    });
            }
        })
;
};
const rubricDeleteOne  = (req,res) => {
    const {rubricid} = req.params;
    if (rubricid){
        Rub
            .findByIdAndRemove(rubricid)
            .exec((err, rubric) => {
                if (err){
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
                "message" : "no rubric"
            });
    }
};


module.exports = {
    rubricsList,
    rubricCreate,
    rubricReadOne,
    rubricUpdateOne,
    rubricDeleteOne
}
