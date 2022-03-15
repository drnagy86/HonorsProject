
/* GET homepage */
const index = (req, res) => {
    res.render('index', { title: 'MEAN Rubric' });
};
module.exports = {
    index
};