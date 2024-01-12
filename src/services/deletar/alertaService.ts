import { prisma_db } from "../../database/prisma_db";


export default async function Deletar_alerta_service(alerta_id:string,) {

    const alerta = prisma_db.alertas.delete({
        where:{id: parseInt(alerta_id)}
    }) 

    return alerta  
}