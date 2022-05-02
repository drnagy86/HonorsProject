const mongoose = require('mongoose');
const Rub = mongoose.model('Rubric');

// return res
//     .status(200)
//     .json({
//         "message": "worked"
//     });

const facetsReadAll = (req, res) => {
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
            res
                .status(200)
                .json(rubric)
        })
}
const facetsCreateOne = (req, res) => {
    const rubricId = req.params.rubricid;
    if (rubricId){
        Rub
            .findById(rubricId)
            .select('facets')
            .exec((err, rubric) => {
                if (err){
                    res
                        .status(400)
                        .json(err)
                } else {
                    doAddFacet(req, res, rubric);
                }
            });
    } else {
        res
            .status(404)
            .json({"message" : "Rubric not found"});
    }

}
const facetsReadOne = (req, res) => {
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
                    const response = {
                        rubric : {
                            name : rubric.name,
                            id : req.params.rubricid
                        },
                        facet
                    };
                    return res
                        .status(200)
                        .json(response);
                }
            } else {
                return res
                    .status(404)
                    .json({
                        "message" : "no facets found"
                    });
            }
        });
}
const facetsUpdateOne = (req, res) => {
    const rubricId = req.params.rubricid;
    const facetId = req.params.facetid;
    if (!rubricId || !facetId){
        return res
            .status(404)
            .json({
                "message" : "Not found, both rubricid and facetId are required"
            })
    }
    Rub
        .findById(rubricId)
        .select('facets')
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
            if (rubric.facets && rubric.facets.length > 0){
                //const thisFacet = rubric.subjects.subject_id(subjectId);
                const thisFacet = rubric.facets.find(f => f._id == facetId);
                if (!thisFacet){
                    res
                        .status(404)
                        .json({
                            "message" : "Facet not found"
                        });
                } else {
                    const {
                        // old_facet_id,
                        // old_description,
                        // new_facet_id,
                        // new_description

                        old_name,
                        old_description,
                        new_name,
                        new_description


                    } = req.body;

                    // console.log(req.body);
                    // console.log(thisFacet.name);
                    // console.log(thisFacet.description);
                    //
                    // console.log(thisFacet.name === old_name && thisFacet.description === old_description);

                    if (thisFacet.name === old_name && thisFacet.description === old_description){
                        thisFacet.name = new_name;
                        thisFacet.description = new_description;
                        thisFacet.dateUpdated = Date.now();

                        rubric.save((err, rubric) =>{
                            if(err){
                                res
                                    .status(404)
                                    .json(err);
                            } else {
                                res
                                    .status(200)
                                    .json(thisFacet);
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
                        "message" : "No facet to update"
                    });
            }
        });
}
const facetsDeleteOne = (req, res) => {
    const {rubricid, facetid} = req.params;
    if (!rubricid || !facetid) {
        return res
            .status(404)
            .json({'message': 'Not found, rubricid and facetid are both required'});
    }
    Rub
        .findById(rubricid)
        .select('facets')
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

            // console.log(rubric);
            // console.log(rubric.facets);
            // console.log(rubric.facets.length);
            // console.log(rubric.facets && rubric.facets.length > 0);

            if (rubric.facets.length == 1 ){
                return res
                    .status(404)
                    .json({'message': 'can not delete last facet'});
            }
            else if (rubric.facets && rubric.facets.length > 0) {
                if (!rubric.facets.id(facetid)) {
                    return res
                        .status(404)
                        .json({'message': 'facet not found'});
                } else {


                    rubric.facets.remove(rubric.facets.find(f => f.id === facetid));

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
                    .json({'message': 'No facet to delete'});
            }
        });
}

const doAddFacet = (req, res, rubric) => {
    if (!rubric){
        res
            .status(404)
            .json({
                "message" : "Rubric not found"
            });
    } else {
        const { name, description } = req.body;
        rubric.facets.push({
            name,
            description
        });
        rubric.save((err, rubric) => {
            if (err){
                res
                    .status(400)
                    .json(err);
            } else {
                const thisFacet = rubric.facets.slice(-1).pop();
                res
                    .status(201)
                    .json(thisFacet);
            }
        });
    }
};

module.exports = {
    facetsReadAll,
    facetsCreateOne,
    facetsReadOne,
    facetsUpdateOne,
    facetsDeleteOne
}