const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express(); // 🔹 Inicializa o Express primeiro
const routes = require("./routes"); // 🔹 Depois carrega as rotas

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(routes); // 🔹 Agora está na posição correta

// 🔹 Rota de teste para verificar se o servidor está rodando
app.get("/", (req, res) => {
  res.send("Servidor MMH rodando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
