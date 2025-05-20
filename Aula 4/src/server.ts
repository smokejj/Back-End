import express, { Application } from "express";
import usuarioRoutes from "./routes/UsuarioRoutes"
import produtoRoutes from "./routes/ProdutoRoutes"

const app: Application = express();

app.use(express.json());

//Rotas da aplicação
app.use('/api', usuarioRoutes);
app.use('/api', produtoRoutes);

app.listen(3000, ()=>{
    console.log(`🔥Servidor rodando em http://localhost:3000`)
})
