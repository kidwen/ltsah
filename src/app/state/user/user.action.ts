export class GetUser {
    public static type: string = '[User] GetUser';
    public constructor(public id: string) {}
}

// tslint:disable-next-line: no-default-export
export default {
    GetUser,
};
