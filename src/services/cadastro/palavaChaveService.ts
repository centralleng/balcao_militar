import { prisma_db } from "../../database/prisma_db";


export default async function Cadastar_palavra_chave_service(palavra_chave:string, user_id:string,id_telegram:string) {

    const alerta = prisma_db.alertas.create({
        data:{
            palavra_chave: palavra_chave,
            user_id: user_id,
            id_telegram: id_telegram,
        }
    }) 

    return alerta  
}