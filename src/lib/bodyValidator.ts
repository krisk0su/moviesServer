import express from "express";
import { Keys } from "../../keys";
import { BadRequestError } from "typescript-rest/dist/server/model/errors";

export const validateBody = (fileName: string, intName: string, req: express.Request) => {
    const keys = Keys(fileName, intName);
    const error = getErrors(keys, req.body);
    if (error) throw new BadRequestError(error);
};

const getErrors = (keys: string[], body: object) => {
    let err = null;
    for (let i = 0; i < keys.length; i++) {
        if (!body.hasOwnProperty(keys[i])) {
            err = `Body requires ${keys[i]} property.`
            break;
        }
    }
    return err;
}