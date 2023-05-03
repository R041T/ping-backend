import {IDatabaseRepo} from '../../../infrastructure/db/db'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export class UserRepository<T> extends IDatabaseRepo<T>{

    async searchUsers(searchTerm: string|number,currUser: string): Promise<string> {
        try{

            const compare = `%${searchTerm}%`;
  

            const result:string = await prisma.$queryRaw`select * from "Users" where id not in (select P.userid from "Participants" P 
            inner join "Users" U on P.userid = U.id
            where 
            P."userid"::text != ${currUser}
            and P.roomid in (select distinct roomid from "Participants" where "userid"::text =${currUser}))
            and id::text !=${currUser}
            and email like ${compare};
            `;
            
            return new Promise<string>(async (resolve,reject)=>{
              resolve(result);
            })
          }
  
            
          catch(err){
            return new Promise<string>(async (resolve,reject)=>{
              reject(err);
            })
          }
        }

      async searchUsersInRoom(roomId: string|number,currUser: string): Promise<string> {
        try{
            const result:string = await prisma.$queryRaw`select userid from "Participants"
            where 
            "userid"::text != ${currUser}
            and roomid = ${roomId};
            `;
            
            return new Promise<string>(async (resolve,reject)=>{
              resolve(result);
            })
          }
  
            
          catch(err){
            return new Promise<string>(async (resolve,reject)=>{
              reject(err);
            })
          }
        }
}