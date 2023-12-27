import crypto from "crypto";
import { prisma_db } from "../../database/prisma_db";
import moment from "moment";
import api from "../api_asaas/api";

interface dados {
    valor: number;
    titulo: string;
    nome: string | null;
    document: string | null;
    email: string | null;
    id_telegram: number;
    phone: string;
    produto_id: number;
    user_id: string;
}

export default async function Pagamento (dados:dados) { 
  
    const criarPedido = await prisma_db.pedidos.create({
        data:{
            // valor: dados.valor,
            titulo: dados.titulo,
            nome: dados.nome,
            document: dados.document,
            email: dados.email,
            id_telegram: dados.id_telegram.toString(),
            phone: dados.phone,
            produto_id: dados.produto_id,
            user_id: dados.user_id,
        }
    })     
    
    if(criarPedido) {
        return {status:'ok', url: criarPedido.id}
    }else{
        return {status:'error', url: ''}
    }
   
}

