import {IServerMethods,IDatabase,ISocketMethods} from '../../../infrastructure/customTypes'
import {getChatList, insertNewMessage} from '../../data/chat/usecase'
import { chatMessage, chatListData } from './schema'
import {} from '../../websockets/chatHandlers'

export function fetchChats(app:IServerMethods,db:IDatabase){

    app.post('/chatlist',async (req:any, res:any)=>{
        const currUser: string = req.body.curruser;
        const chatList:any = await getChatList(db,currUser);
        const result:chatListData[]=[];
        for(var i of chatList){
            result.push(i);
        }
        if(result !== undefined){
            res.send(result);
        }
    })
}

export function addMessage(app:IServerMethods,db:IDatabase,io:ISocketMethods){
    app.post('/addchatmessage',async (req:any,res:any)=>{
        const data : chatMessage = req.body;
        const id:any = await insertNewMessage(db, data);
        if(id[0] !== undefined){
            const result: string = id[0].id;
            res.send(result)
        }
        else res.send('failed')
    }) 
}