import { ICreateUser } from "./user.dto";
import userSchema from "./user.schema";

export const createUser = async(data:ICreateUser) =>{
    try{
        const result = await userSchema.create({
            name: data.name,
            email: data.email,
            password: data.password
        })
        return result;
    }catch(e){
        console.log("Unable to create User : ", e)
    }
}
export const getUserByEmail = async(email: string) =>{
    try{
        const result = await userSchema.findOne({
            email: email,
        }).lean();
        return result;
    }catch(e){
        console.log(`Unable to find user ${email} `, e)
    }
}