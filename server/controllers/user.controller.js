exports.allAccess = (req, res) => {
    res.status(200).send("Conteúdo Geral")
};

exports.membreBoard = (req, res) => {
    res.status(200).send("Conteúdo de Membre")
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Conteúdo de Admin")
};

exports.corujaBoard = (req, res) => {
    res.status(200).send("Conteúdo de Coruja")
};