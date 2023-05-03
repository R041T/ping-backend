import {ISocketMethods} from '../../infrastructure/customTypes'



module.exports = (io:ISocketMethods, socket:ISocketMethods) => {
    const sendMessage = (payload:any) => {
        io.to(payload.chatid).emit("message",payload);
    }

    const startChat = (payload:any) => {
        io.to(payload.data.chatid).emit("new-chat",payload);
    }

    const joinRooms = (payload:any) => {
        for(let i of payload){
            socket.join((i.roomid));
        }
    }

    const notifyUser = (payload:any) => {
        socket.join(payload.roomid);
        socket.to(payload.recipient).emit("notify-user",payload.roomid);
    }

  
    socket.on("message", sendMessage);
    socket.on("join-rooms", joinRooms);
    socket.on("notify-user",notifyUser);
    socket.on("new-chat",startChat);
  }