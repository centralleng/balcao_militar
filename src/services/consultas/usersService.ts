import { prisma_db } from "../../database/prisma_db"

async function Consultas_usersService () {   
    const usuarios = await prisma_db.credenciados.findMany()
    return usuarios
}export {Consultas_usersService}