const mongoose = require('mongoose');
const Rub = mongoose.model('Rubric');


const criteriaReadAllForRubric = (req, res) => {
    // '/rubrics/:rubricid/facets/:facetid/criteria'
    //console.log(req.params.rubricid)
    Rub
        .findById(req.params.rubricid)
        .select('facets')
        .exec((err, rubric) =>{
            if (!rubric) {
                return res
                    .status(404)
                    .json({
                        "message": "rubric not found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            // found the rubric
            if(rubric.facets && rubric.facets.length > 0){
                const facet = rubric.facets.find( f => f._id == req.params.facetid);
                if (!facet) {
                    return res
                        .status(400)
                        .json({
                            "message" : "facet not found"
                        });
                } else {
                    if(facet.criteria && facet.criteria.length > 0){
                        const criteria = facet.criteria;
                        if (!criteria) {
                            return res
                                .status(400)
                                .json({
                                    "message" : "criteria not found"
                                });
                        } else {
                            const response = {
                                rubric : {
                                    name : rubric.name,
                                    id : req.params.rubricid,
                                    facet: req.params.facetid
                                },
                                criteria
                            };
                            return res
                                .status(200)
                                .json(response);
                        }
                    } else {
                        return res
                            .status(404)
                            .json({
                                "message" : "no criteria found"
                            });
                    }
                }
            }
            else {
                return res
                    .status(404)
                    .json({
                        "message" : "no facets found"
                    });
            }
        });
}
const criteriaCreateOne= (req, res)  => {
    return res
        .status(200)
        .json({
            "message": "worked"
        });
}
const criteriaReadOne= (req, res)  => {
    Rub
        .findById(req.params.rubricid)
        .select('facets')
        .exec((err, rubric) =>{
            if (!rubric) {
                return res
                    .status(404)
                    .json({
                        "message": "rubric not found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            // found the rubric
            if(rubric.facets && rubric.facets.length > 0){
                const facet = rubric.facets.find( f => f._id == req.params.facetid);
                if (!facet) {
                    return res
                        .status(400)
                        .json({
                            "message" : "facet not found"
                        });
                } else {
                    if(facet.criteria && facet.criteria.length > 0){
                        const criteria = facet.criteria;
                        if (!criteria) {
                            return res
                                .status(400)
                                .json({
                                    "message" : "criteria not found"
                                });
                        } else {
                            const thisCriteria = criteria.find(c => c._id == req.params.criteriaid);
                            const response = {
                                rubric : {
                                    name : rubric.name,
                                    id : req.params.rubricid,
                                    facet : req.params.facetid,
                                },
                                thisCriteria
                            };
                            return res
                                .status(200)
                                .json(response);
                        }
                    } else {
                        return res
                            .status(404)
                            .json({
                                "message" : "no criteria found"
                            });
                    }
                }
            }
            else {
                return res
                    .status(404)
                    .json({
                        "message" : "no facets found"
                    });
            }
        });

}
const criteriaUpdateOne= (req, res)  => {
    Rub
        .findById(req.params.rubricid)
        .select('facets')
        .exec((err, rubric) =>{
            if (!rubric) {
                return res
                    .status(404)
                    .json({
                        "message": "rubric not found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            // found the rubric
            if(rubric.facets && rubric.facets.length > 0){
                const facet = rubric.facets.find( f => f._id == req.params.facetid);
                if (!facet) {
                    return res
                        .status(400)
                        .json({
                            "message" : "facet not found"
                        });
                } else {
                    if(facet.criteria && facet.criteria.length > 0){
                        const criteria = facet.criteria;
                        if (!criteria) {
                            return res
                                .status(400)
                                .json({
                                    "message" : "criteria not found"
                                });
                        } else {
                            const thisCriteria = criteria.find(c => c._id == req.params.criteriaid);
                            if (!thisCriteria){
                                res
                                    .status(404)
                                    .json({
                                        "message" : "Criteria not found"
                                    });
                            }
                            else {
                                const {
                                    old_content,
                                    new_content,
                                    old_score,
                                    new_score
                                } = req.body;

                                // console.log(old_content === thisCriteria.content);
                                // console.log(old_score == thisCriteria.score);

                                if (old_content === thisCriteria.content && old_score == thisCriteria.score){
                                    thisCriteria.content = new_content;
                                    thisCriteria.score = new_score;
                                    thisCriteria.dateUpdated = Date.now();

                                    rubric.save((err, rubric) =>{
                                        if(err){
                                            res
                                                .status(404)
                                                .json(err);
                                        } else {
                                            res
                                                .status(200)
                                                .json(thisCriteria);
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
                        }

                    } else {
                        return res
                            .status(404)
                            .json({
                                "message" : "no criteria found"
                            });
                    }
                }
            }
            else {
                return res
                    .status(404)
                    .json({
                        "message" : "no facets found"
                    });
            }
        });
}
const criteriaDeleteOne= (req, res)  => {
    Rub
        .findById(req.params.rubricid)
        .select('facets')
        .exec((err, rubric) =>{
            if (!rubric) {
                return res
                    .status(404)
                    .json({
                        "message": "rubric not found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            // found the rubric
            if(rubric.facets && rubric.facets.length > 0){
                const facet = rubric.facets.find( f => f._id == req.params.facetid);
                if (!facet) {
                    return res
                        .status(400)
                        .json({
                            "message" : "facet not found"
                        });
                } else {
                    if(facet.criteria && facet.criteria.length > 0){
                        const criteria = facet.criteria;
                        if (!criteria) {
                            return res
                                .status(400)
                                .json({
                                    "message" : "criteria not found"
                                });
                        } else {
                            if(facet.criteria && facet.criteria.length > 0){
                                if (!facet.criteria.id(req.params.criteriaid)){
                                    return res
                                        .status(404)
                                        .json({'message': 'criteria not found'});
                                } else {
                                    facet.criteria.id(req.params.criteriaid).remove();
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
                                return res
                                    .status(404)
                                    .json({
                                        "message" : "no criteria found"
                                    });
                            }
                        }
                    } else {
                        return res
                            .status(404)
                            .json({
                                "message" : "no criteria found"
                            });
                    }
                }
            }
            else {
                return res
                    .status(404)
                    .json({
                        "message" : "no facets found"
                    });
            }
        });

}



module.exports = {
    criteriaReadOne,
    criteriaReadAllForRubric,
    criteriaDeleteOne,
    criteriaCreateOne,
    criteriaUpdateOne
}