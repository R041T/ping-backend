import {AuthenticationRoutes} from './authentication/routes'
import {UserDataRoutes} from './userChats/routes'
import {SingleChatDataRoutes} from './singleChatManager/routes'
import {IServerMethods,IDatabase,ISocketMethods} from '../../infrastructure/customTypes'

export function InitRoutes(app:IServerMethods, db:IDatabase, io: ISocketMethods){

AuthenticationRoutes(app,db);
UserDataRoutes(app,db);
SingleChatDataRoutes(app,db,io);
}