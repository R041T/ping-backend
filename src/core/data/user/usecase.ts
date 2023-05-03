import {IDatabase} from '../../../infrastructure/customTypes'
import {PrismaClient} from '@prisma/client'
import {UserRepository} from './repository'
import {User} from './model'
import { userInfo } from 'os';


const prisma = new PrismaClient();

export async function insertUser(db: IDatabase, data: User){

    const table = db.users;
    const user = new UserRepository(table);
    if(table!== undefined){ 
      const condition = {email: data.email}
      const res = await user.createUnique(data, condition);
    }
    else{
      console.log("no table selected");
    }
}





export async function getManyUsersLike(db:IDatabase, searchTerm:string|number, currUser:string){
    const table = db.users;
    const user = new UserRepository(table);
    if(table!== undefined){
      const res:string = await user.searchUsers(searchTerm,currUser);
      return res;
    }
    else return "failed";
}

export async function getUsersInRoom(db:IDatabase, roomId:string|number, currUser:string): Promise<string>{
  const table = db.participants;
  const user = new UserRepository(table);
  if(table!== undefined){
    const res:string = await user.searchUsersInRoom(roomId,currUser);
    return res;
  }
  else return "failed";
}

export async function getUserId(db:IDatabase, userEmail:string): Promise<string>{
  const table = db.users;
  const user = new UserRepository(table);
  if(table!== undefined){
    const condition = {
      email:  userEmail
    }
    
    const res:any = await user.findUnique(condition);
    return res.id;
  }
  else return "failed";
}