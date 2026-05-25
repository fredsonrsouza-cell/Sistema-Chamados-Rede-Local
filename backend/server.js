const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "sistema_chamados"
});

conexao.connect((erro) => {
    if (erro) {
        console.log(erro);
    } else {
        console.log("Banco conectado");
    }
});

app.post("/chamados", (req, res) => {

    const { nome, setor, solicitacao } = req.body;

    const sql = `
        INSERT INTO chamados(nome, setor, solicitacao)
        VALUES (?, ?, ?)
    `;

    conexao.query(
        sql,
        [nome, setor, solicitacao],
        (erro, resultado) => {

            if (erro) {
                res.status(500).json(erro);
            } else {
                res.status(201).json({
                    mensagem: "Chamado cadastrado"
                });
            }
        }
    );
});

app.get("/chamados", (req, res) => {

    const sql = "SELECT * FROM chamados";

    conexao.query(sql, (erro, resultados) => {

        if (erro) {
            res.status(500).json(erro);
        } else {
            res.json(resultados);
        }
    });
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Servidor rodando na porta 3000");
});