import { PrismaClient } from "@prisma/client"

export interface IServerMethods{
    get(data:any, response: any): void
    post(data:any, response: any): void
}

export interface ISocketMethods{
    on(data:any, response: any): void
    get(data:any, response: any): void
    post(data:any, response: any): void
    emit(data:any, response: any): void
    to(data:any): any
    join(data:any): any
}

// Prisma specific. Change for another database
export interface IDatabaseMethods{
    create(data:any):void
    upsert(data: any): void
    findMany(data: any): any
    findUnique(data: any): any
}

export type IDatabase = PrismaClient;