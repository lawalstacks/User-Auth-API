// Interface for User

export interface IUser  {
    _jid?:string; //json generated Id
    id?: string;
    username: string;
    email: string;
    password: string;
    createdAt: any;
    [Key: string]: any;
}
