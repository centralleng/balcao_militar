import { prisma_db } from "../../database/prisma_db"

async function Consultas_alertasService(user_id:string) {

    const alertas = await prisma_db.alertas.findMany({
        where:{user_id:user_id}
    })

    return alertas

}export {Consultas_alertasService}