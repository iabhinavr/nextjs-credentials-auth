import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: String,
    username: String,
    password_hash: String,
});

export const User = models?.User || model('User', userSchema);

export async function mongooseConnect() {
    const mongooseConnection = await mongoose.connect("mongodb://localhost:27017/sampledb");
    return mongooseConnection;
}