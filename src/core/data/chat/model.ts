export interface Room{
  isPrivate : boolean
  starter : string
  recipient: string
  isStartedChat : boolean 
}

export interface chatMessage{
  roomid: string, 
  message: string, 
  sender: string,
  sendTime: string 
}

export interface chatMessageInfo{
    messageid: string,
    sender: string,
    message: string,
    sendTime: string
}

export interface chatInfo{
  isPrivate: boolean,
    starter: string,
    isStartedChat: boolean,
    messageinfo: chatMessageInfo[],
    userid: string,
    email: string,
    photoUrl: string,
    name: string,
}

export interface getChats{
    details: chatInfo,
}