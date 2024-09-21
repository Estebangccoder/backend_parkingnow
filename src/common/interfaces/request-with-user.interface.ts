export interface RequestWithUser extends Request{
    user: {
        email:string
        role_id:number
        user_id:string
    }
}