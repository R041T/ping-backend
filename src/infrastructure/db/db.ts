import { PrismaClient } from '@prisma/client'
import { rejects } from 'assert';
import { resolve } from 'path';
import {IDatabaseMethods} from '../customTypes'

const prisma = new PrismaClient();


interface IReader<T>{
  findUnique(data: Partial<T>): Promise<T[]>;
  findManyLike(data: Partial<T>,notCondition:Partial<T>): Promise<T[]>;
}

interface IWriter<T>{
  create(data: Partial<T>): Promise<string>;
  createUnique(data: Partial<T>, condition: Partial<T>): Promise<string>;
}

type IBaseDB<T> = IReader<T> & IWriter<T>;

export abstract class IDatabaseRepo<T> implements IBaseDB<T> {


  constructor(
    public readonly table: IDatabaseMethods,
    ){}
  
  async findManyLike(condition: Partial<T>, notCondition:Partial<T>={}): Promise<T[]> {
    try{

      const users = await this.table.findMany({
        where: {
          OR: condition,
          NOT: notCondition,
      },
      })

    return new Promise<T[]>(async (resolve,reject)=>{
      resolve(users)
    })}
    catch(err){
      return new Promise<T[]>(async (resolve,reject)=>{
        reject(err);
      })
    }
  }

  async findUnique(condition: Partial<T>): Promise<T[]> {
    try{

      const user = await this.table.findUnique({
        where: condition
      
      })

    return new Promise<T[]>(async (resolve,reject)=>{
      resolve(user)
    })}
    catch(err){
      return new Promise<T[]>(async (resolve,reject)=>{
        reject(err);
      })
    }
  }

   async create(data: Partial<T>): Promise<string> {
    try{

      const result = await this.table.create({data:data,});
      return new Promise<string>(async (resolve,reject)=>{
        resolve('successfully added')
      })
    }
    catch(err){

      return new Promise<string>(async (resolve,reject)=>{
        reject(err);
      })
    }
  }
  
  async createUnique(data: Partial<T>, condition: Partial<T>): Promise<string> {
    try{
      const result = await this.table.upsert({
        where: condition,
        update: {
        },
        create: data,
      });
    return new Promise<string>(async (resolve,reject)=>{
      resolve('successfully added')
    })}
    catch(err){
      return new Promise<string>(async (resolve,reject)=>{
        reject(err);
      })
    }
    
  }
}


export function InitDB(){
    return prisma;
}


