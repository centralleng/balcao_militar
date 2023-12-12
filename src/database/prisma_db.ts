import { PrismaClient } from '@prisma/client'

const prisma_db = new PrismaClient()

export { prisma_db }