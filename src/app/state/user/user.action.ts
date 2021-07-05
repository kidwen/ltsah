/* eslint-disable @typescript-eslint/naming-convention */
export class GetUser {
    public static type: string = '[User] GetUser';
    public constructor(public id: string) {}
}

export default {
    GetUser,
};
