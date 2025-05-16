import express, { Application, Request, Response , NextFunction} from 'express';

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());


// 🔹 Rota GET (Buscar dados)
app.get('/usuarios', (req: Request, res: Response) => {
  res.status(200).json({ mensagem: 'Lista de usuários' });
});

app.get('/sobre', (req: Request, res: Response) => {
      res.status(200).json({ nome:"Jé", idade:16,descricao:"ala esquerdo" });
});

// 🔹 Rota POST (Criar novo usuário)
app.post('/usuarios', (req: Request, res: Response) => {
  const { nome } = req.body;
  if (!nome) {
    res.status(400).json({ mensagem: 'Nome é obrigatório!' });
  }
  res.status(201).json({ mensagem: `Usuário ${nome} criado com sucesso!` });
});

app.post('/comentarios', (req:Request,res: Response)=>{
  const {texto} = req.body;
  if(!texto){
    res.status(400).json({mensagem: "Texto é obrigatório"});
    return;
  }
  res.status(201).json({mensagem: "Commetário recebido"});
  return;
})

  app.delete('/comentarios/:id', (req: Request, res: Response)=>{
    const {id} = req.params;
    res.status(204).json({mensagem:"Comentario excluido"});
  })

  const dataLog = (req: Request, res:Response, next: NextFunction)=>{
  let data: Date = new Date;
  console.log(`Requisição feita em:${data}`)
  next();
}

app.use(dataLog)

const porteiroMiddleware = (req: Request, res: Response, next: Function) => {
  console.log(`📢 Requisição recebida em: ${req.url}`);
  next(); // Permite a requisição continuar para a rota
};

app.use(porteiroMiddleware);


app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
