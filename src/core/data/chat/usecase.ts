import {IDatabase} from '../../../infrastructure/customTypes'
import {PrismaClient} from '@prisma/client'
import {ChatRepository} from './repository'
import {chatMessage, Room} from './model'


const prisma = new PrismaClient();

export async function insertNewChat(db: IDatabase, data: Room){

    const table = db.rooms;
    const chatlist = new ChatRepository(table);
    if(table!== undefined){ 
        const res = await chatlist.createNewChat(data, data.isPrivate,data.starter, data.recipient,data.isStartedChat);
        return res;
      }
      else{
        console.log("no table selected");
      }   
}

export async function getChatList(db: IDatabase, currUser: string){
  const table = db.rooms;
  const chatlist = new ChatRepository(table);
  if(table!== undefined){ 
    
      const res = await chatlist.getChatList(currUser);
      return res;
    }
    else{
      console.log("no table selected");
    }   

}

export async function insertNewMessage(db: IDatabase, data: chatMessage){

    const table = db.rooms;
    const chatlist = new ChatRepository(table);
    if(table!== undefined){ 
        const res:string = await chatlist.createNewMessage(data.roomid,data.message,data.sender,data.sendTime);
        return res;
      }
      else{
        console.log("no table selected");
      }   
}