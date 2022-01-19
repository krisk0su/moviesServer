import { ICreateUser, ILoginUser, IUserDocument } from "../Interfaces/users";
import { userModel } from "../Models/users/users";
import { UnauthorizedError } from "typescript-rest/dist/server/model/errors";
import { createJWT } from "../lib/jwtService";

const WRONG_CREDENTIALS = "Wrong credentials";

export const createUser = async (user: ICreateUser) => {
    const newUser = new userModel(user);
    return await newUser.save();
}

export const loginUser = async (user: ILoginUser) => {
    const foundUser: IUserDocument = await userModel.findOne({userName: user.userName});
    if(!foundUser){
        throw new UnauthorizedError(WRONG_CREDENTIALS);
    };

    const isPasswordValid = await foundUser.isValidPassword(user.password);
    if(!isPasswordValid){
        throw new UnauthorizedError(WRONG_CREDENTIALS);
    };

    return createJWT(foundUser);
};