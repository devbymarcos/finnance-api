import User from "../../models/user-model/User.js";
import { dataReturn } from "../../helpers/functions.js";
import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
    const user = new User();
    user.setId(res.locals.userAuth.id);
    const data = await user.findById();
    res.json(dataReturn(data, "user"));
};
export const registerUser = async (req: Request, res: Response) => {
    const user = new User();
    user.setFirstName(req.body.first_name);
    user.setLastName(req.body.last_name);
    user.setEmail(req.body.email);
    user.setPassword(req.body.password);
    const data = await user.register();
    res.json(dataReturn(data, "user"));
};

export const updateUser = async (req: Request, res: Response) => {
    const user = new User();
    user.setId(res.locals.userAuth.id);
    user.setFirstName(req.body.first_name);
    user.setLastName(req.body.last_name);
    user.setEmail(req.body.email);
    user.setPassword("");
    const data = await user.update();
    res.json(dataReturn([data], "user"));
};

export const updatePassword = async (req: Request, res: Response) => {
    const userObj = {
        id: res.locals.userAuth.id,
        first_name: "",
        last_name: "",
        email: "",
        password: req.body.password,
    };
    const user = new User();
    const data = await user.updatePass();
    res.json(dataReturn(data, "/user"));
};
