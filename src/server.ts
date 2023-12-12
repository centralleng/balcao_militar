import "reflect-metadata";
import express, { Request, Response, NextFunction, request } from "express";
import "express-async-errors";
import { router } from "./routes";
import cors from "cors"; // Para permitir utilização de fonte end externo.
import { cronDiario } from "./cron/cronDiario";

const port = process.env.PORT || 4007;

//@ypes/express -- Chama todas as funcionalidades do exprees ela é colocada na constante app.
const app = express();

app.use(cors()); // Para permitir utilização de fonte end externo.


app.use('/files',express.static('src/public')); //pega as requisições e faz um json

app.use(express.json()); //pega as requisições e faz um json

app.use(router); //Recebe as informações das rotas e server

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return response.status(400).json({
            error: err.message            
        })        
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

app.listen(port, function () {
    console.log(`O servidor está rodando da porta ${port}...`);
});


cronDiario.envia()

