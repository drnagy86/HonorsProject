const express = require('express');
const router = express.Router();
const ctrlRubrics = require('../controllers/rubrics');
const ctrlSubjects = require('../controllers/subjects');

//rubrics
router
    .route('/rubrics')
    .get(ctrlRubrics.rubricsList)
    .post(ctrlRubrics.rubricCreate);
router
    .route('/rubrics/:rubricid')
    .get(ctrlRubrics.rubricReadOne)
    .put(ctrlRubrics.rubricUpdateOne)
    .delete(ctrlRubrics.rubricDeleteOne)

// subjects
router
    .route('/rubrics/:rubricid/subjects')
    .get(ctrlSubjects.subjectReadAll)
    .post(ctrlSubjects.subjectCreate)
router
    .route('/rubrics/:rubricid/subjects/:subjectid')
    .get(ctrlSubjects.subjectReadOne)
    .put(ctrlSubjects.subjectUpdateOne)
    .delete(ctrlSubjects.subjectDeleteOne)


module.exports = router;