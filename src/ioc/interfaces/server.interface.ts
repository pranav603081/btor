export interface IServerConnection{
    connect:()=>Promise<boolean>
}