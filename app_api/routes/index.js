const express = require('express');
const router = express.Router();

const ctrlRubrics = require('../controllers/rubrics');
const ctrlSubjects = require('../controllers/subjects');
const ctrlAuth = require('../controllers/authentication');
const ctrlFacets = require('../controllers/facets');
const ctrlCriteria = require('../controllers/criteria')

const jwt = require('express-jwt');
const auth = jwt({
    secret : process.env.JWT_SECRET,
    algorithms: ['HS512'], // https://github.com/auth0/express-jwt#required-parameters
    userProperty: 'payload'     //defines a property on request to be called 'payload'
});

//rubrics
router
    .route('/rubrics')
    .get(ctrlRubrics.rubricsList)
    .post(ctrlRubrics.rubricCreate);
    //.post(auth, ctrlRubrics.rubricCreate);
router
    .route('/rubrics/:rubricid')
    .get(ctrlRubrics.rubricReadOne)
    // .put(auth, ctrlRubrics.rubricUpdateOne)
    // .delete(auth, ctrlRubrics.rubricDeleteOne)
    .put(auth, ctrlRubrics.rubricUpdateOne)
    .delete(auth, ctrlRubrics.rubricDeleteOne)
// subjects
router
    .route('/rubrics/:rubricid/subjects')
    .get(ctrlSubjects.subjectReadAll)
    //.post(auth, ctrlSubjects.subjectCreate)
    .post(ctrlSubjects.subjectCreate)
router
    .route('/rubrics/:rubricid/subjects/:subjectid')
    .get(ctrlSubjects.subjectReadOne)
    // .put(auth, ctrlSubjects.subjectUpdateOne)
    // .delete(auth, ctrlSubjects.subjectDeleteOne)
    .put(ctrlSubjects.subjectUpdateOne)
    .delete(ctrlSubjects.subjectDeleteOne)

// facets
router
    .route('/rubrics/:rubricid/facets')
    .get(ctrlFacets.facetsReadAll)
    .post(ctrlFacets.facetsCreateOne)

router
    .route('/rubrics/:rubricid/facets/:facetid')
    .get(ctrlFacets.facetsReadOne)
    .put(ctrlFacets.facetsUpdateOne)
    .delete(ctrlFacets.facetsDeleteOne)

// criteria
router
    .route('/rubrics/:rubricid/facets/:facetid/criteria')
    .get(ctrlCriteria.criteriaReadAllForRubric)
    .post(ctrlCriteria.criteriaCreateOne)

router
    .route('/rubrics/:rubricid/facets/:facetid/criteria/:criteriaid')
    .get(ctrlCriteria.criteriaReadOne)
    .put(ctrlCriteria.criteriaUpdateOne)
    .delete(ctrlCriteria.criteriaDeleteOne)

// user authentication
router
    .route('/register')
    .post(ctrlAuth.register)
router
    .route('/login')
    .post(ctrlAuth.login)

module.exports = router;