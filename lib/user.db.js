import { mongooseConnect, User } from "./db";

export async function createUser(userData) {
    try {
        mongooseConnect();
        const user = await User.create(userData);

        if(!user) {
            return null;
        }
        return user;
    }
    catch(error) {
        return false;
    }

}

export async function getUserByEmail(email) {
    try {
        await mongooseConnect();

        const user = await User.findOne({email: email}).exec();

        if(!user) {
            return null;
        }
        return user;
    }
    catch(error) {
        return false;
    }
}

export async function getUserByUsername(username) {
    try {
        await mongooseConnect();

        const user = await User.findOne({username: username}).exec();

        if(!user) {
            return null;
        }
        return user;
    }
    catch(error) {
        return false;
    }
}