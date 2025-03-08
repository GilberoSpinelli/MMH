const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const routes = require("./routes");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(routes);

console.log("Rotas carregadas com sucesso!");

// 🔹 Exibir todas as rotas registradas no Express
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

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
