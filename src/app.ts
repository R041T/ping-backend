import express from 'express'
import * as dotenv from 'dotenv'
import { InitDB } from './infrastructure/db/db' 
import {InitRoutes} from './core/api/router'
const { createServer } = require("http");
const { Server } = require("socket.io");
const chatHandlers = require("./core/websockets/chatHandlers");

var cors = require('cors')
var bodyParser = require('body-parser')


const main = async() =>{
    dotenv.config()
    const app = express();

    var corsOptions = {
        origin: process.env.CLIENT_HOST,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
      }
    app.use(cors(corsOptions));
    app.use(bodyParser.json());

    const db = InitDB();


    const httpServer = createServer(app);
    const io = new Server(httpServer,{
        cors: {
          origin: process.env.CLIENT_HOST,
          methods: ["GET", "POST"]
        }
      });



    const onConnection = (socket:any) => {
        console.log('user connected');
        socket.on("disconnect", (reason:any) => {
            console.log('user disconnected. reason: ',reason);
          });
        chatHandlers(io, socket);
    }
    
    io.on("connection", onConnection);

    InitRoutes(app,db,io);
    app.get('/',(req:any,res:any)=>res.status(200).json({hello:'world'}));

    
    //app.listen(process.env.PORT,()=>console.log('Server Running')); // Express Port
    httpServer.listen(process.env.SOCKET_PORT); // Websockets Port

}


main();