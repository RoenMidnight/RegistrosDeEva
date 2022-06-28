const express = require('express')
const cors = require('cors');
require('dotenv').config();

const app = express()
const port = process.env.PORT;

let corsOptions = { origin: 'https://localhost:3000' }

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require('./models');
//const { initial } = require('lodash');
const Role = db.role;

db.mongoose
    .connect(process.env.CONNECTION_STRING, {
        //useNewParser: false,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Conexão com o banco de dados realizada com sucesso");
        initial();
    })
    .catch(err => {
        console.log("Erro de Conexão", err);
        process.exit();
    });

//rotas
app.get('/', (req, res) => {
    res.json({ message: 'Olá Mundo'});
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
});


function initial(){
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0){
            new Role({
                name: "membre"
            }).save(err => {
                if (err){
                    console.log("error", err);
                }
                console.log("Adicionado Membre da Guilda");
            });
            
            new Role({
                name:"coruja"
            }).save(err => {
                if (err){
                    console.log("error", err);
                } 
                console.log("Adicionado Coruja")
            });

            new Role({
                name:"admin"
            }).save(err => {
                if (err){
                    console.log("error", err);
                }
                console.log("Adicionado Administrador")
            });
        }
    });
}