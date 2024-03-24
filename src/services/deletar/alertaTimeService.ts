import moment from "moment";
import { prisma_db } from "../../database/prisma_db";

export async function deletarAlertaAbandonado() {

    const alerta = await prisma_db.alertas.findMany({
        where:{tipo_grupo:null}
    })    

    if(alerta.length>0){
    
    for await ( let item of alerta) {
        
        const dataAtual = moment(); // Obtém a data e hora atual
        const dataProduto = moment(item.updated_at); // Converte a data do alerta para um objeto Moment
        const minutos = dataAtual.diff(dataProduto, 'minutes');

        if(minutos>3){
            await prisma_db.alertas.delete({
                where:{id: item.id}
            })
        }
    }

    }    
} 