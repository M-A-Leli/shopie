"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma;
var createPrismaClient = function () {
    switch (process.env.NODE_ENV) {
        case 'production':
            return new client_1.PrismaClient({
                datasources: {
                    db: {
                        url: process.env.DATABASE_URL_PROD,
                    },
                },
            });
        case 'test':
            return new client_1.PrismaClient({
                datasources: {
                    db: {
                        url: process.env.DATABASE_URL_TEST,
                    },
                },
            });
        default:
            return new client_1.PrismaClient({
                datasources: {
                    db: {
                        url: process.env.DATABASE_URL_DEV,
                    },
                },
            });
    }
};
// Initialize the prisma client
prisma = createPrismaClient();
exports.default = prisma;
