const { verifySignUp } = require('../middleware');
const controller = require('../controllers/auth.controller');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Origin",
            "http://localhost:5000"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        res.header(
            'Access-Control-Allow-Methods', 'GET,PUT,POST'
        );
        res.header(
            'Access-Control-Allow-Headers', 'Content-Type'
        );
        
        next();
    });

    app.post(
        '/api/auth/signup',
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );
    
    app.post('/api/auth/signin', controller.signin);
};