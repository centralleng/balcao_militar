import { prisma_db } from "../../database/prisma_db"

interface dados {
    produto_id: string
}

async function Consultas_pedidoService (data:dados) {

    console.log(data)

    const pedido = await prisma_db.pedidos.findUnique({
        where:{id:parseInt(data.produto_id)}
    })

    if(pedido){
        return pedido
    }else{        
        throw new Error("error");
    }
}export {Consultas_pedidoService}