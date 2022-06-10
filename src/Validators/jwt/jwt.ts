import express from "express";
import { Errors } from "typescript-rest";
import { verifyJwt } from "../../lib/jwtService";
import { decode } from "jsonwebtoken";
import { Roles } from "../../Interfaces/users";

export function jwtValidator(req: express.Request){
    if(!req.headers.authorization){
        throw new Errors.UnauthorizedError("You must log in.")
    }
    const bearer = req.headers.authorization;
    verifyJwt(bearer);
    return bearer;
}

export function jwtValidAdmin(req: express.Request){
    const bearer = jwtValidator(req);
    const decoded: any = decode(bearer);
    const isAdmin = decoded.roles.includes(Roles.Admin);
    if(!isAdmin){
        throw new Errors.UnauthorizedError("You are not admin.")
    }
}