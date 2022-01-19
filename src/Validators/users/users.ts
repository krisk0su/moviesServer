import express from "express";
import { BadRequestError } from "typescript-rest/dist/server/model/errors";
import { ICreateUser } from "../../Interfaces/users";
import { validateBody } from "../../lib/bodyValidator";

const fileName = "users";

export const createUserValidator = (req: express.Request) => {
    validateBody(fileName, 'ICreateUser', req);
    const user: ICreateUser = req.body;

    if (user.password !== user.confirmPassword) {
        throw new BadRequestError("Password should match confirm password.");
    }
}

export const loginUserValidator = (req: express.Request) => {
    validateBody(fileName, 'ILoginUser', req);
}