import "reflect-metadata";
import express, { Request, Response, NextFunction, request } from "express";
import "express-async-errors";
import { router } from "./routes";
import cors from "cors"; // Para permitir utilização de fonte end externo.
import http from "http";
import { Server } from 'socket.io';

//@ypes/express -- Chama todas as funcionalidades do exprees ela é colocada na constante app.
const app = express();
const serverhttp = http.createServer(app);

app.use(cors()); // Para permitir utilização de fonte end externo.

// app.use(cors({  // Para permitir utilização de fonte end externo exclusivo para um ip ou site
//     origin: "http://localhost:3000"
// })); 

const io = new Server(serverhttp, {
  cors: {
     origin: "*",
     methods: ["GET", "POST"]
   }
 })

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
        message: "Internal Server Error",
    })
})

export { serverhttp, io }



