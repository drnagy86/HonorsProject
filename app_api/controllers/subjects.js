
const mongoose = require('mongoose')
const {response} = require("express");
const e = require("express");
const Rub = mongoose.model('Rubric');

const allSubjects = (req, res) =>{

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
                // .json(rubrics);
                .json(findAllSubjects(rubrics));
        });
};

function findAllSubjects(rubrics) {

    let testDictionary = {};

    for (let i = 0; i < rubrics.length; i++) {
        if (rubrics[i].subjects.length > 0){
            for (let j = 0; j < rubrics[i].subjects.length; j++) {
                testDictionary[rubrics[i].subjects[j].subject_id] = rubrics[i].subjects[j];
            }
        }
    }

    const values = Object.values(testDictionary);

    return values;
}

const subjectReadAll = (req, res) => {
    Rub
        .findById(req.params.rubricid)
        .select('subjects')
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
        })
};

const subjectReadOne = (req, res) => {

    // return res
    //     .status(200)
    //     .json({
    //         "message": "worked"
    //     });

    Rub
        .findById(req.params.rubricid)
        .select('subjects')

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

            // found the rubric
            if(rubric.subjects && rubric.subjects.length > 0){
                //console.log(req.params.subjectid);
                const subject = rubric.subjects.find( r => r.subject_id == req.params.subjectid);
                //console.log(subject);
                //const subject = rubric.subjects.findById(req.params.subjectid);
                if (!subject) {
                    return res
                        .status(400)
                        .json({
                            "message" : "subject not found"
                        });
                } else {
                    const response = {
                        rubric : {
                            name : rubric.name,
                            id : req.params.rubricid
                        },
                        subject
                    };
                    return res
                        .status(200)
                        .json(response);
                }
            } else {
                return res
                    .status(404)
                    .json({
                        "message" : "no subjects found"
                    });
            }
        });
};

const subjectUpdateOne = (req, res) => {
    const rubricId = req.params.rubricid;
    const subjectId = req.params.subjectid;
    if (!rubricId || !subjectId){
        return res
            .status(404)
            .json({
                "message" : "Not found, both rubricid and subjectid are required"
            })
    }

    Rub
        .findById(rubricId)
        .select('subjects')
        .exec((err, rubric) => {
            if (!rubric){
                return res
                    .status(404)
                    .json({
                        "message" : "Rubric not found"
                    });
            } else if (err){
                return res
                    .status(400)
                    .json(err);
            }
            if (rubric.subjects && rubric.subjects.length > 0){
                //const thisSubject = rubric.subjects.subject_id(subjectId);
                const thisSubject = rubric.subjects.find(s => s.subject_id == subjectId);
                if (!thisSubject){
                    res
                        .status(404)
                        .json({
                            "message" : "Subject not found"
                        });
                } else {
                    const {
                        old_subject_id,
                        old_description,
                        new_subject_id,
                        new_description
                    } = req.body;
                    if (thisSubject.subject_id === old_subject_id && thisSubject.description === old_description){
                        thisSubject.subject_id = new_subject_id;
                        thisSubject.description = new_description;

                        rubric.save((err, rubric) =>{
                            if(err){
                                res
                                    .status(404)
                                    .json(err);
                            } else {
                                res
                                    .status(200)
                                    .json(thisSubject);
                            }
                        });
                    } else {
                        res
                            .status(404)
                            .json({
                                "message" : "Unable to update because record has changed since starting edit"
                            });
                    }

                }
            } else {
                res
                    .status(404)
                    .json({
                        "message" : "No subject to update"
                    });
            }
        });
};

const subjectDeleteOne = (req, res) => {
    const {rubricid, subjectid} = req.params;
    if (!rubricid || !subjectid) {
        return res
            .status(404)
            .json({'message': 'Not found, rubricid and subjectid are both required'});
    }
    Rub
        .findById(rubricid)
        .select('subjects')
        .exec((err, rubric) => {
            if (!rubric) {
                return res
                    .status(404)
                    .json({'message': 'rubric not found'});
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }

            if (rubric.subjects && rubric.subjects.length > 0) {
                if (!rubric.subjects.id(subjectid)) {
                    return res
                        .status(404)
                        .json({'message': 'subject not found'});
                } else {
                    rubric.subjects.id(subjectid).remove();
                    rubric.save(err => {
                        if (err) {
                            return res
                                .status(404)
                                .json(err);
                        } else {
                            res
                                .status(204)
                                .json(null);
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({'message': 'No subject to delete'});
            }
        });
};

const subjectCreate = (req, res) => {
    const rubricId = req.params.rubricid;

    // return res
    //     .status(200)
    //     .json({
    //         "message" : req.params.rubricid
    //     })
    //


    if (rubricId){
        Rub
            .findById(rubricId)
            .select('subjects')
            .exec((err, rubric) => {
                if (err){
                    res
                        .status(400)
                        .json(err)
                } else {
                    doAddSubject(req, res, rubric);

                    // return res
                    //     .status(200)
                    //     .json({
                    //         "message" : req.body.subject_id
                    //     })

                }
            });
    } else {
        res
            .status(404)
            .json({"message" : "Rubric not found"});
    }
};

const doAddSubject = (req, res, rubric) => {
    if (!rubric){
        res
            .status(404)
            .json({
                "message" : "Rubric not found"
            });
    } else {
        const { subject_id, description } = req.body;

        rubric.subjects.push({
            subject_id,
            description
        });
        rubric.save((err, rubric) => {
            if (err){
                res
                    .status(400)
                    .json(err);
            } else {
                const thisSubject = rubric.subjects.slice(-1).pop();
                res
                    .status(201)
                    .json(thisSubject);
            }
        });
    }
};



module.exports = {
    allSubjects,
    subjectReadAll,
    subjectCreate,
    subjectReadOne,
    subjectUpdateOne,
    subjectDeleteOne
}
