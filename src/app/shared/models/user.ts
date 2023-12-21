export interface User {
    readonly id: string;
    readonly username: string;
    readonly email: string;
    readonly mobile: string;
    readonly authorities: any;
    readonly enabled: boolean;

}