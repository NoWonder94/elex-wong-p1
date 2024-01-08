import { PrismaClient as LegacyPrismaClient } from '../generated/prisma/legacy-schema';
import { PrismaClient as MainPrismaClient } from '../generated/prisma/main-schema';

export const prisma = new MainPrismaClient({});

export const prismaLegacy = new LegacyPrismaClient();