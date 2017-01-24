let app = require('express').Router();

app.get('/:code', (req, res)=> {
    let msg = '';
    switch (req.params.code) {
        case '404':
            msg = 'Page not found';
            break;
        default:
            msg = 'An error occurred.';
            break;
    }
    res.status(200).render('error', {code: req.params.code, message: msg});
});

module.exports = app;