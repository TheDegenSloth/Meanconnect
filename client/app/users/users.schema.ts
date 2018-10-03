export class UsersSchema {
    admin?: boolean;
    userlevel?: number;
    username: string;
    image?: string;
    firstlogindate?: Date;
    lastlogindate?: Date;
    ip?: string;
    session?: string;
}
