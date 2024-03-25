import { prisma_db } from "../../database/prisma_db";


export default async function Deletar_alerta_service(alerta_id:string) {

    const alerta = await prisma_db.alertas.delete({
        where:{id: parseInt(alerta_id)}
    }) 

    console.log(alerta)
   
}