import express from "express";
import { buscarLojasPorBairro } from "./request.js";

const app = express();
const port = 3333;
app.use(express.json());


app.get('/lojas', async (req, res) => {
    const cidade = req.query.cidade;
    const bairro = req.query.bairro;
    

    if (!cidade || !bairro) {
        return res.status(400).json({ error: 'Parâmetros cidade e bairro são obrigatórios.' });
    }

    try {
        const lojas = await buscarLojasPorBairro(cidade, bairro);
        if (lojas) {
            res.json({ lojas });
        } else {
            res.status(404).json({ error: 'Não foi possível encontrar lojas para o bairro especificado.' });
        }
    } catch (error) {
        console.error("Ocorreu um erro:", error);
        res.status(500).json({ error: 'Ocorreu um erro ao processar sua solicitação.' });
    }
});
  

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});