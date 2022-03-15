const request = require('request');
const {response} = require("express");
const apiOptions = {
    server : 'http://localhost:3000'
};
// to remind about setting up for production
// if (process.env.NODE_ENV === 'production') {
//     apiOptions.server = 'https://pure-temple-67771.herokuapp.com';
// }

// skeleton api call
// const requestOptions = {
//     url: 'http://yourapi.com/api/path',
//     method: 'GET',
//     json: {},
//     qs: {
//         offset: 20
//     }
// };
// request(requestOptions, (err, response, body) => {
//     if (err) {
//         console.log(err);
//     } else if (response.statusCode === 200) {
//         console.log(body);
//     } else {
//         console.log(response.statusCode);
//     }
// });
//

/* Get 'home' pages */
const rubricList = (req, res) => {
    homelist(req, res);
};

/* Get the details of a rubric */
const rubricDetailViewController = (req, res) => {
    rubricDetails(req, res);
};

const renderRubricDetailPage = (req, res, rubric) => {
    let message = null;

    res.render('rubric-detail', {
        title: rubric.name,
        pageHeader: {
            title: 'Rubric Maker- ' + rubric.name,
        },
        rubric, message
    });
};

const rubricDetails = (req, res) => {
    const path = `/api/rubrics/${req.params.rubricid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    request(requestOptions, (err, {statusCode}, body) => {
        let data = body;

        if (statusCode === 200){
            data.dateCreated = new Intl.DateTimeFormat('en-US').format( new Date(body.dateCreated));
            data.dateUpdated = new Intl.DateTimeFormat('en-US').format( new Date(body.dateUpdated));
            renderRubricDetailPage(req, res, data);
        } else {
            showError(req,res,statusCode);
        }
    });
};

const homelist = (req, res) => {
    const path = '/api/rubrics';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    request(requestOptions, (err, response, body) => {
        renderHomepage(req, res, body);
    });
};

const renderHomepage = (req, res, responseBody) => {
    let message = null;
    if (!(responseBody instanceof Array)){
        message = "API lookup error";
        responseBody = [];
    } else {
        if (!responseBody.length){
            message = "No rubrics found";
        }
    }

    res.render('rubric-list', {
        title: 'Rubric Maker',
        pageHeader: {
            title: 'Rubric Maker',
            strapLine: 'Create analytic rubrics.'
        },
        rubrics: responseBody, message
    });
};

const showError = (req, res, status) =>  {
    let title = '';
    let content = '';
    if (status === 404) {
        title = '404, page not found';
        content = 'Oh dear. Looks like you can\'t find this page. Sorry.';
    } else {
        title = `${status}, something's gone wrong`;
        content = 'Something, somewhere, has gone just a little bit wrong.';
    }
    res.status(status);
    res.render('generic-text', {
        title,
        content
    });
};



module.exports = {
    rubricList,
    rubricDetail: rubricDetailViewController
};