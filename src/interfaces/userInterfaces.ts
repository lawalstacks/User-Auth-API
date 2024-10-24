// Interface for User

export interface IUser  {
    _jid?:string; //json generated Id
    username: string;
    email: string;
    password: string;
    createdAt: any;
    [Key: string]: any;
}
