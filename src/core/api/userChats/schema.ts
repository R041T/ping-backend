

export interface userData{
userid: string,
chatid: number,
name: string,
email: string,
photoUrl: string,
time: string,
snippet: string,
unread: number
}

export interface Room{
    isPrivate : boolean
    starter : string 
    recipient: string
    isStartedChat : boolean 
  }