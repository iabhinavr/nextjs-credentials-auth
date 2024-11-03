import { mongooseConnect, User } from "./db";

export async function createUser(userData) {
    try {
        await mongooseConnect();
        const user = await User.create(userData);
        console.log(user);

        if(!user) {
            return null;
        }
        return user;
    }
    catch(error) {
        return null;
    }

}