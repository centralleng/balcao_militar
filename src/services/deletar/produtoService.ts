import moment from "moment";
import { prisma_db } from "../../database/prisma_db";

export async function deletarProdutoAbandonado() {

    const produto = await prisma_db.produtos.findMany({
        where:{status:false||null}
    })

    if(produto.length>0){
    
    for await ( let item of produto) {
        
        const dataAtual = moment(); // Obtém a data e hora atual
        const dataProduto = moment(item.updated_at); // Converte a data do produto para um objeto Moment
        const minutos = dataAtual.diff(dataProduto, 'minutes');

        if(minutos>5){
            await prisma_db.produtos.delete({
                where:{id: item.id}
            })
        }
    }

    }    
} 