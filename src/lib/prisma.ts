import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    // Log para verificar as querys dos BDs
    log: ['query']
})