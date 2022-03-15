const mongoose = require('mongoose');

// const criteriaSchema = new mongoose.Schema({
//     criteria_id : {
//         type : String,
//         required : true,
//         unique : true
//     },
//     content : {
//         type : String,
//         required : true
//     },
//     score : {
//         type : Number,
//         required : true,
//         min : 0,
//         max : 9
//     },
//     dateCreated : {
//         type : Date,
//         required : true,
//         'default' : Date.now()
//     },
//     dateUpdated : {
//         type : Date,
//         required : true,
//         'default' : Date.now()
//     },
//     active : {
//         type: Boolean,
//         'default': true
//     }
// });

// const facetTypeSchema = new mongoose.Schema({
//     facetType_id : {
//         type : String,
//         required : true,
//         unique : true
//     },
//     description : {
//         type : String,
//         required : true
//     },
//     active : {
//         type: Boolean,
//         'default': true
//     }
// });

// const facetsSchema = new mongoose.Schema({
//     facet_id : {
//         type : String,
//         required : true,
//         unique : true
//     },
//     description : {
//         type : String,
//         required : true
//     },
//     dateCreated : {
//         type : Date,
//         required : true,
//         'default' : Date.now()
//     },
//     dateUpdated : {
//         type : Date,
//         required : true,
//         'default' : Date.now()
//     },
//     active : {
//         type: Boolean,
//         'default': true
//     },
//     facetType : [facetTypeSchema],
//     criteria : [criteriaSchema]
// });

// const scoreTypeSchema = new mongoose.Schema({
//    scoreType_id : {
//        type : String,
//        required : true,
//        unique : true
//    },
//     description : {
//         type : String,
//         required : true
//     },
//     active : {
//         type: Boolean,
//         'default': true
//     }
// });

const subjectsSchema = new mongoose.Schema({
    _id : false,
    subject_id : {
        type : String,
        required : true,
        unique: true,
        index : true
    },
    description : {
        type : String,
        //required : true
    },
    dateCreated : {
        type : Date,
        required : true,
        'default' : Date.now()
    },
    dateUpdated : {
        type : Date,
        required : true,
        'default' : Date.now()
    },
    active : {
        type: Boolean,
        'default': true
    }
});

// const levelsSchema = new mongoose.Schema({
//     level_id : {
//         type : String,
//         required : true,
//         unique : true
//     },
//     description : {
//         type : String,
//         required : true
//     },
//     dateCreated : {
//         type : Date,
//         required : true,
//         'default' : Date.now()
//     },
//     dateUpdated : {
//         type : Date,
//         required : true,
//         'default' : Date.now()
//     },
//     active : {
//         type: Boolean,
//         'default': true
//     }
// });

// const establishedGoalsSchema = new mongoose.Schema({
//     establishedGoal_id : {
//         type : String,
//         required : true,
//         unique : true
//     },
//     description : {
//         type : String,
//         required : true
//     },
//     dateCreated : {
//         type : Date,
//         required : true,
//         'default' : Date.now()
//     },
//     dateUpdated : {
//         type : Date,
//         required : true,
//         'default' : Date.now()
//     },
//     active : {
//         type: Boolean,
//         'default': true
//     }
// });

const rubricSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    dateCreated : {
        type : Date,
        required : true,
        'default' : Date.now()
    },
    dateUpdated : {
        type : Date,
        required : true,
        'default' : Date.now()
    },
    rubricCreator : {
        type : String,
        required : false
    },
    active : {
        type: Boolean,
        'default': true
    },
    //scoreType: [scoreTypeSchema],
    subjects : {
        type : [subjectsSchema],
        required : false,
        unique: true
    },
    // levels : [levelsSchema],
    // establishedGoals : [establishedGoalsSchema],
    // facets : [facetsSchema]
});

mongoose.model('Rubric', rubricSchema);