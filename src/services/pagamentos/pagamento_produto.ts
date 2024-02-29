import { prisma_db } from "../../database/prisma_db";

interface dados {
    valor: string;
    titulo: string;
    tipo?: string;
    nome: string | null;
    document: string | null;
    email: string | null;
    id_telegram: number;
    ddd: string | null;
    telefone: string | null;
    produto_id: number;
    user_id: string;
}

export default async function Pagamento (dados:dados) { 
  
    const criarPedido = await prisma_db.pedidos.create({
        data: {
            valor: dados.valor,
            titulo: dados.titulo,
            nome: dados.nome,
            tipo: dados?.tipo,
            document: dados.document,
            email: dados.email,
            id_telegram: dados.id_telegram.toString(),
            ddd: dados.ddd,
            telefone: dados.telefone,
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

