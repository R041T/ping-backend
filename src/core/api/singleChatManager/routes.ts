import * as userdata from './controller'
import {IServerMethods,IDatabase,ISocketMethods} from '../../../infrastructure/customTypes'

export function SingleChatDataRoutes(app: IServerMethods, db: IDatabase, io:ISocketMethods){

    userdata.fetchChats(app,db);
    userdata.addMessage(app,db,io);
}