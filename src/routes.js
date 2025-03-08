const express = require("express");

const router = express.Router();

console.log("Arquivo routes.js carregado!");

// 🔹 Log para confirmar que a rota está sendo adicionada
router.post("/usuarios", (req, res) => {
  console.log("POST /usuarios foi chamado!");
  res.json({ mensagem: "Usuário cadastrado com sucesso!" });
});

router.get("/usuarios", (req, res) => {
  console.log("GET /usuarios foi chamado!");
  res.json({ mensagem: "Lista de usuários!" });
});

router.get("/teste", (req, res) => {
  console.log("GET /teste foi chamado!");
  res.json({ mensagem: "A rota de teste está funcionando!" });
});

module.exports = router;
