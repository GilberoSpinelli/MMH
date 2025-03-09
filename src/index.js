const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes");  // Certifique-se de importar o arquivo de rotas corretamente

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS para permitir requisições de diferentes fontes
app.use(cors());

// Habilitar o express para entender JSON no corpo das requisições
app.use(express.json());

// Usar as rotas definidas em routes.js
app.use(routes);

// Log para confirmar que as rotas foram carregadas com sucesso
console.log("Rotas carregadas com sucesso!");

// Exibir todas as rotas registradas no Express para depuração
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`Rota registrada: ${Object.keys(middleware.route.methods)} ${middleware.route.path}`);
  } else if (middleware.name === "router") {
    middleware.handle.stack.forEach((handler) => {
      if (handler.route) {
        console.log(`Rota registrada: ${Object.keys(handler.route.methods)} ${handler.route.path}`);
      }
    });
  }
});

// Iniciar o servidor na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
