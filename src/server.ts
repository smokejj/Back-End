import userRouter from "./routes/userRoutes";
import pokemonRoutes from './routes/pokemonRoutes';
import express, { Application } from "express";
import { AppDataSource } from "./db/data-aource";
import { Response, Request } from "express";
import cors from "cors";
import path from "path";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ['http://localhost:5500', "http://127.0.0.1:5500"]
}))

app.use(express.static('public'));

app.get("/", (req: Request, res: Response) => {
    res.status(200).sendFile(path.join("../public/cadastro.html"));
    return;
})

app.use("/api", userRouter);
app.use("/api", pokemonRoutes);

AppDataSource.initialize().then(() => {
    app.listen(3000, () => {
        console.log("Servidor rodando em http://localhost:3000");
    })
}).catch((error) => {
    console.error(error);
})