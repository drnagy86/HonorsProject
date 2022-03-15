const express = require('express');
const router = express.Router();

//const ctrlMain = require('../controllers/main');
const ctrlRubrics = require('../controllers/rubrics');
const ctrlOthers = require('../controllers/others');

/* GET homepage. */
//router.get('/', ctrlMain.index);
router.get('/', ctrlRubrics.rubricList);
router.get('/rubric/:rubricid', ctrlRubrics.rubricDetail);

/* Other pages */
router.get('/about', ctrlOthers.about);


module.exports = router;
