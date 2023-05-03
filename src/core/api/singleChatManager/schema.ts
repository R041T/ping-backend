
export interface chatListData{
    roomid: string,
    isPrivate:boolean,
    starter:string,
    isStartedChat:boolean,
    userid: string,
    name: string,
    photoUrl: string,
    messagedetails: messageDetails[]
}

export interface messageDetails{
    messageid: string,
    sender: string,
    message: string,
    timeStamp: string,
    readReceipt: number
}


export interface chatMessage{
    id: string, 
    roomid: string, 
    sender: string,
    message: string, 
    sendTime: string 
}