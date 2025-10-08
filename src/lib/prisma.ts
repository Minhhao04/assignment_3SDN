// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    datasources: {
      db: { url: process.env.DATABASE_URL }, // 👈 ép dùng đúng URL có pgbouncer=true
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
