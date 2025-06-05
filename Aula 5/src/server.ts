import express,{Application} from "express"
import userRoutes from "./routes/user.routes"
import productRouters from "./routes/product"
import { AppDataSource } from "./database/data-source";

const app : Application = express();

app.use(express.json())


AppDataSource.initialize()
    .then(() => {
        app.use(express.json());

        app.use('/api', userRoutes);
        app.use('/api', productRouters);

        app.listen(3000, () => console.log('Server rodando na porta 3000'));
    })
    .catch((error) => console.log(error));