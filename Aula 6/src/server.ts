import { AppDataSource } from "./config/data-source";
import express, {Application} from "express"

const app: Application = express();
app.use(express.json());

AppDataSource.initialize().then(() => {
    app.listen(3000,() =>{
        console.log('🔥Servidor rodando em http://localhost:3000')
    })

}).catch((error) =>{
    console.error(error);
})