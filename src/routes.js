const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("./config/prismaClient");
const autenticar = require("./authMiddleware");  // Importando o middleware de autenticação

const router = express.Router();

// Rota para criar um usuário (não protegida, pois o cadastro não exige login)
router.post("/usuarios", async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;

    // Verificar se o email já existe no banco de dados
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: "Email já está em uso!" });
    }

    // Criptografar a senha antes de salvar
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar o novo usuário no banco de dados
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        tipo,
      },
    });

    res.json({ mensagem: "Usuário cadastrado com sucesso!", usuario: novoUsuario });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

// Rota de login (não protegida, pois é necessária para gerar o token)
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verificar se o usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(400).json({ error: "Usuário não encontrado!" });
    }

    // Verificar se a senha está correta
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ error: "Senha incorreta!" });
    }

    // Gerar o token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
      process.env.JWT_SECRET || "secreta",
      { expiresIn: "1h" }
    );

    res.json({ mensagem: "Login realizado com sucesso!", token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro ao realizar login" });
  }
});

// Rota para listar todos os usuários (protegida por autenticação)
router.get("/usuarios", autenticar, async (req, res) => {
  try {
    console.log("🔹 GET /usuarios foi chamado!");
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

module.exports = router;
