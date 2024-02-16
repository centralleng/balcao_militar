import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router } from "./routes";
import cors from "cors"; // Para permitir utilização de fonte end externo.
import { cronDiario } from "./cron/cronDiario";
import { Bot_bd_mil } from "./bot/bot_bd_mil";
import { Bot_bd_mil_venda } from "./bot/bot_bd_mil_venda";
import { Bot_bd_mil_comprar } from "./bot/bot_bd_mil_comprar";
import { Bot_bd_mil_alertas } from "./bot/bot_bd_mil_alertas";
import { Bot_bd_mil_news } from "./bot/bot_bd_mil_news";
import { Bot_bd_mil_suporte } from "./bot/bot_bd_mil_suporte";
import { Bot_bd_mil_coronel } from "./bot/bot_bd_mil_coronel";
import { Bot_bd_mil_sugestoes } from "./bot/bot_bd_mil_sugestoes";

const port = process.env.PORT || 4002;

//@ypes/express -- Chama todas as funcionalidades do exprees ela é colocada na constante app.
const app = express();

app.use(cors()); // Para permitir utilização de fonte end externo.

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

Bot_bd_mil.execute()
Bot_bd_mil_venda.execute()
Bot_bd_mil_comprar.execute()
Bot_bd_mil_alertas.execute()

// Bot_bd_mil_news.execute()
// Bot_bd_mil_suporte.execute()
// Bot_bd_mil_sugestoes.execute()
// Bot_bd_mil_coronel.execute()

// cronDiario.envia()

