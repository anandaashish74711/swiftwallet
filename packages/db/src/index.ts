// @repo/db/index.ts
import { PrismaClient } from '@prisma/client';

// Use a singleton pattern to prevent multiple instances of Prisma in development.
const prisma = new PrismaClient();

export { prisma, PrismaClient }; // Export the Prisma client instance and types if needed.
