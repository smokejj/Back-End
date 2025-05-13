import express, {Application, Request, Response} from "express"

const app = express();

app.get('/', (req: Request, res:Response) => {
    res.send("<h1>Hellou Word</h1>") 
});

app.get('/nome', (req: Request, res: Response) => {
    res.send("<h1>Olá</h1>") 
});

app.listen(3000, () => {
    console.log("Projeto rodando na porta 3000")
})