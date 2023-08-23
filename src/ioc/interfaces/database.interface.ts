export interface IDataBaseConnection{
    connect:()=>Promise<boolean>
}