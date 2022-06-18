const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err){
            res.status(500).send({
                message: err
            });
            return;
        }
        if (user){
            res.status(400).send({
                message: "Usuário já existe"
            });
            return;
        }

        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err){
                res.status(500).send({message:err});
                return
            }

            if (user){
                res.status(400).send({message:"Email já em uso"});
                return;
            }

            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles){
        for (let i = 0; i < req.body.roles.length; i++){
            if (!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: `Autenticação ${req.body.roles[i]} não existe.`
                });
                return;
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
}

module.exports = verifySignUp;