import * as auth from './controller'
import {IServerMethods,IDatabase} from '../../../infrastructure/customTypes'

export function AuthenticationRoutes(app:IServerMethods, db: IDatabase){

    auth.createUser(app,db);
    auth.fetchUserId(app,db);
}