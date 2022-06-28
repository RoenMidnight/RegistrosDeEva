const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Origin",
            "http://localhost:5000"
        );
        res.header(
            "Access-Control-Allow-Methods", 
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        res.header("Access-Control-Allow-Credentials", true);
        next();
    });

    app.get("/api/test/all", controller.allAccess);
    app.get("/api/test/membre", [authJwt.verifyToken], controller.membreBoard);
    app.get(
        '/api/test/coruja',
        [authJwt.verifyToken, authJwt.isCoruja],
        controller.corujaBoard
    );
    app.get(
        '/api/test/admin',
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    )
}