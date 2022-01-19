import { model, Schema } from "mongoose";
import { ICreateUser, IUserDocument } from "../../Interfaces/users";
import { hash, compare } from "bcrypt";

const users: Schema<IUserDocument> = new Schema<IUserDocument>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    userName: {type: String, required: true},
});


users.pre(
    'save',
    async function(next) {
        const hashed = await hash(this.password, 10);
        this.password = hashed;
        next();
    }
);

users.methods.isValidPassword = async function(password: string) {
    const user = this;
    const isValid = await compare(password, user.password);

    return isValid;
};

export const userModel = model<IUserDocument>('Users', users);