// authMiddleware.js

const jwt = require("jsonwebtoken");

const autenticar = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Acesso negado. Token não encontrado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreta");
    req.usuario = decoded; // Adiciona o usuário decodificado à requisição
    next(); // Passa para o próximo middleware ou rota
  } catch (error) {
    return res.status(401).json({ error: "Token inválido." });
  }
};

module.exports = autenticar;
