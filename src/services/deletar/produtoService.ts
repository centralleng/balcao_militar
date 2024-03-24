import { prisma_db } from "../../database/prisma_db";

export async function deletarProdutoAbandonado() {

    const produto = await prisma_db.produtos.findMany({
        where:{status:false||null}
    })

    console.log(produto)
    
} 