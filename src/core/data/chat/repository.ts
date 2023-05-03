import {IDatabaseRepo} from '../../../infrastructure/db/db'
import {IDatabaseMethods} from '../../../infrastructure/customTypes'
import { PrismaClient } from '@prisma/client'
import {chatMessageInfo, getChats} from './model'
import { send } from 'process';
import { start } from 'repl';

const prisma = new PrismaClient();


export class ChatRepository<T> extends IDatabaseRepo<T>{

    async createNewChat(data: Partial<T>, isPrivate: boolean, starter:string, recipient:string, isStartedChat: boolean): Promise<string> {

      try{

          const id:string = await prisma.$queryRaw`select roomid, string_agg(userid::text,',') FROM "Participants" p 
          WHERE "userid"::text IN (${starter},${recipient}) 
          AND NOT EXISTS (SELECT NULL FROM "Participants" as pp WHERE p.roomid=pp.roomid 
          AND pp."userid"::text NOT IN (${starter},${recipient})) 
          GROUP BY roomid 
          HAVING count(DISTINCT p.userid)=2`;
          

          if(id[0]!==undefined){
            return new Promise<string>(async (resolve,reject)=>{
              resolve(id);
            })
          }
          else{
            const result:any = await prisma.$queryRaw`insert into "Rooms" ("isPrivate",starter) 
            select ${isPrivate},${starter}::uuid
            where not exists (select * from "Rooms" R
            inner join "Participants" P ON R.id = P.roomid
            where R."starter"::text = '${starter}' and P."userid"::text = '${recipient}') RETURNING id`

            const createMany = await prisma.participants.createMany({  // After creating room, Add participants to room if room doesn't alraedy exist
              data: [
                { userid: starter, roomid: result[0].id},
                { userid: recipient, roomid: result[0].id},
              ],
            })
            return new Promise<string>(async (resolve,reject)=>{
              resolve(result);
            })}
          }

          
          catch(err){
            return new Promise<string>(async (resolve,reject)=>{
              reject(err);
            })
          }
      }
 
    async getChatList(currUser: string): Promise<getChats[]> {
      try{

          const result:any[] = await prisma.$queryRaw`select R.id as roomid,"isPrivate",starter,"isStartedChat",M.id as messageid,sender,"message","sendTime","readReceipt", P.userid, U.email,U."photoUrl",U.name from "Participants" P 
          inner join "Rooms" R on R.id = P.roomid 
          inner join "Users" U on P.userid = U.id
		      left join "Messages" M on R.id = M.roomid
          where 
          P."userid"::text != ${currUser}
          and P.roomid in (select distinct roomid from "Participants" where "userid"::text =${currUser});`;

          var finals:any[]=[];
          const map = new Map(); 
          var details = {};
          result.forEach((value,index)=>{
            let messagedetails:any=[];

            if(map.has(value.roomid)){
              messagedetails = map.get(value.roomid).messagedetails;
            }

            if(value.messageid!=null){
              messagedetails.push({messageid: value.messageid, sender: value.sender, message: value.message, timeStamp: value.sendTime, readReceipt: value.readReceipt});
            }

            details = {
              roomid : value.roomid,
              isPrivate: value.isPrivate,
              starter: value.starter,
              isStartedChat: value.isStartedChat,
              userid: value.userid,
              photoUrl: value.photoUrl,
              name: value.name,
              messagedetails: messagedetails
            }
            map.set(value.roomid, details);

          })
          map.forEach((room) => {finals.push(room)});

          return new Promise<getChats[]>(async (resolve,reject)=>{
            resolve(finals);
          })
        }

          
        catch(err){
          return new Promise<getChats[]>(async (resolve,reject)=>{
            reject(err);
          })
        }
      }

      async createNewMessage(roomid: string, message: string, sender:string, sendTime:string): Promise<string> {
  
        try{

            const id:string = await prisma.$queryRaw`
            INSERT INTO "Messages" (roomid,message,sender,"sendTime") values (${roomid}::uuid,${message},${sender}::uuid,${sendTime}::timeStamp)
            RETURNING id;`;
            
              return new Promise<string>(async (resolve,reject)=>{
                resolve(id);
              })
          
          }             
          catch(err){
            return new Promise<string>(async (resolve,reject)=>{
              reject(err);
            })
          }
        }

}
