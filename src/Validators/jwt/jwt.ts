import express from "express";
import { Errors } from "typescript-rest";
import { verifyJwt } from "../../lib/jwtService";

export function jwtValidator(req: express.Request){
    if(!req.headers.authorization){
        throw new Errors.UnauthorizedError("You must log in.")
    }
    const bearer = req.headers.authorization;
    verifyJwt(bearer);
}