const express = require("express");
const prisma = require("./config/prismaClient");



const router = express.Router();

// Rota para cadastrar um usuário
router.post("/usuarios", async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;

    const novoUsuario = await prisma.usuario.create({
      data: { nome, email, senha, tipo },
    });

    res.json(novoUsuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

// Rota para listar todos os usuários
router.get("/usuarios", async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});

// Rota para cadastrar um plantão
router.post("/plantoes", async (req, res) => {
  try {
    const { medicoId, data, duracao, setor } = req.body;

    const novoPlantao = await prisma.plantao.create({
      data: { medicoId, data: new Date(data), duracao, setor },
    });

    res.json(novoPlantao);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar plantão" });
  }
});

// Rota para listar todos os plantões
router.get("/plantoes", async (req, res) => {
  const plantoes = await prisma.plantao.findMany();
  res.json(plantoes);
});

module.exports = router;
