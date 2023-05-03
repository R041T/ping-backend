import {IServerMethods,IDatabase} from '../../../infrastructure/customTypes'
import {getManyUsersLike} from '../../data/user/usecase'
import {insertNewChat, getChatList} from '../../data/chat/usecase'
import {getUsersInRoom} from '../../data/user/usecase'
import { userData,Room } from './schema'


export function fetchUsers(app:IServerMethods,db:IDatabase){

    app.post('/userlist',async (req:any, res:any)=>{
        const searchTerm: string|number  = req.body.searchterm;
        const currUser: string = req.body.curruser;
        const users:any = await getManyUsersLike(db,searchTerm,currUser);
        let result:userData[]=[]; 

        for(var i of users){

            let temp:userData = {userid:i.id,chatid:2,name:i.name,email:i.email,photoUrl:i.photoUrl,time:"",snippet:"",unread:0};
            result.push(temp);
        }
        if(users !== "failed"){
            res.send(result);
        }
    })
}

export function fetchUsersInRoom(app:IServerMethods,db:IDatabase){

    app.post('/roomusers',async (req:any, res:any)=>{
        const roomid: string|number  = req.body.roomid;
        const currUser: string = req.body.curruser;
        const users:any = await getUsersInRoom(db,roomid,currUser);
        let result:userData[]=[]; 

        for(var i of users){
            result.push(i);
        }
        if(users !== "failed"){
            res.send(result);
        }
    })
}


export function addChatList(app:IServerMethods,db:IDatabase){
    app.post('/addchat',async (req:any,res:any)=>{
        const data : Room = req.body;
        const id:any = await insertNewChat(db, data);
        if(id[0] !== undefined){
            const result: string = id[0].id;
            res.send(result)
        }
        else res.send('failed')
        }) 
}

