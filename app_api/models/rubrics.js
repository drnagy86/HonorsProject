const mongoose = require('mongoose');

const subjectsSchema = new mongoose.Schema({
    subject_id : {
        type : String,
        required : true,
        index : true,
        dropDups: true
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

const criteriaSchema = new mongoose.Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    content : {
        type : String,
        required : true,
        maxLength : 250

    },
    score : {
        type : Number,
        required : true,
        min : 0,
        max : 9
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

// const facetTypeSchema = new mongoose.Schema({
//     _id : {
//         type : String,
//         required : true,
//         unique : true,
//         index : true
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

const facetsSchema = new mongoose.Schema({
    _id : {
        type : String,
        required : true,
        unique : true,
        index : true,
        maxLength : 100
    },
    description : {
        type : String,
        required : true,
        maxLength : 500
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
    },
    // facetType : [{
    //     type : facetTypeSchema,
    //     ref: 'FacetType',
    //     required : false,
    //     unique : false
    //
    // }],
    criteria : [{
        type : criteriaSchema,
        ref: 'Criteria',
        required : false,
        unique : false

    }]

});

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
        required : true
    },
    active : {
        type: Boolean,
        'default': true
    },
    subjects : [{
        type : subjectsSchema,
        ref: 'Subject',
        required : false,
        unique : true

    }],
    //subjects: [subjectsSchema],
    //scoreType: [scoreTypeSchema],

    // levels : [levelsSchema],
    // establishedGoals : [establishedGoalsSchema],
    facets : [{
        type : facetsSchema,
        ref: 'Facet',
        required : false,
        unique : false

    }]
});

mongoose.model('Subject', subjectsSchema);
mongoose.model('Rubric', rubricSchema);