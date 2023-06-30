import { RoleModel } from "./role.model";

export class UserModel{
    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public city: string;
    public street: string;
    public role: RoleModel;
}