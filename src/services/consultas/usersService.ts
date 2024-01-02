import { prisma_db } from "../../database/prisma_db"

async function Consultas_usersService (produto_id:number) {   
    const pedido = await prisma_db.pedidos.findUnique({
        where:{id:produto_id}
    })

    if(pedido){
        return pedido
    }else{        
        throw new Error("error");
    }
}export {Consultas_usersService}