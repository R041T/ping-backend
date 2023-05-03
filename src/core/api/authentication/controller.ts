import {insertUser,getUserId} from '../../data/user/usecase'
import {IServerMethods, IDatabase} from '../../../infrastructure/customTypes'
import {User} from './schema'

export function createUser(app:IServerMethods, db:IDatabase):void{

    app.post('/createuser',(req:any,res:any)=>{
        const data : User = req.body;
        const result = insertUser(db, data);        
        res.send('success');
        })  
        
}


export function fetchUserId(app:IServerMethods, db:IDatabase):void{

    app.post('/getuserid',async (req:any,res:any)=>{
        const email : string = req.body.email;
        const result : string = await getUserId(db, email);
        res.send(result)
        })

}


