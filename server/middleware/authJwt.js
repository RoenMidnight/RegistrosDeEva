const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");
const db = require('../models');
require('dotenv').config();

const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token){
        return res.status(403).send({ message: "Token não disponibilizado" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err){
            return res.status(401).send({ message: "Acesso não autorizado!" });
        }
        req.userId = decoded.indexOf;
        next();
    });
}

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err){
            res.status(500).send({ message: err });
            return;
        }
        Role.find({
            _id: { $in: user.roles }
        },
        (err, roles) => {
            if(err) {
                res.status(500).send({message:err});
                return;
            }
            for (let i = 0; i < roles.length; i++){
                if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }
            res.status(403).send({message: "Necessário autorização de administrador!"});
            return;
            }
        );
    });
};

isCoruja = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err){
            res.status(500).send({message: err});
            return;
        }
        Role.find({
            _id: { $in:user.roles }
        }, (err, roles) => {
            if (err){
                res.status(500).send({messsage: err});
                return;
            }
            for(let i=0; i < roles.length; i++){
                if (roles[i].name === "coruja"){
                    next();
                    return;
                }
            }
            res.status(403).send({message: "Necessário Acesso de Coruja"});
            return;
        });
    });
};

const authJwt = {
    verifyToken,
    isAdmin,
    isCoruja
}

module.exports = authJwt;


