import * as userdata from './controller'
import {IServerMethods,IDatabase} from '../../../infrastructure/customTypes'

export function UserDataRoutes(app: IServerMethods, db: IDatabase){

    userdata.fetchUsers(app,db);
    userdata.fetchUsersInRoom(app,db);
    userdata.addChatList(app,db);
}