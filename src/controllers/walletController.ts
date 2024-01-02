import { Request, Response } from "express";
import { dataReturn } from "../helpers/functions.js";
import Wallet from "../models/Wallet.js";

interface CustomRequest extends Request {
    userAuth: {
        id: number;
    };
}
export const wallets = async (req: CustomRequest, res: Response) => {
    const walletObj = {
        user_id: req.userAuth.id,
    };
    const wallet = new Wallet(walletObj);
    const data = await wallet.findyAll();

    res.json(dataReturn(data, "wallet"));
};

export const walletCreate = async (req: CustomRequest, res: Response) => {
    const walletObj = {
        user_id: req.userAuth.id,
        name: req.body.name,
        description: req.body.description,
        option_wallet: parseInt(req.body.option_wallet),
    };

    const wallet = new Wallet(walletObj);
    const data = await wallet.register();

    res.json(dataReturn(data, "wallet"));
};

export const walletUniq = async (req: CustomRequest, res: Response) => {
    const { id } = req.userAuth;
    const walletObj = {
        id: parseInt(req.params.id),
        user_id: id,
    };
    const wallet = new Wallet(walletObj);
    const data = await wallet.findyById();

    res.json(dataReturn(data, "wallet"));
};

export const walletUpdate = async (req: CustomRequest, res: Response) => {
    const walletObj = {
        id: parseInt(req.body.id),
        name: req.body.name,
        description: req.body.description,
        option_wallet: parseInt(req.body.option_wallet),
    };
    const wallet = new Wallet(walletObj);
    const data = await wallet.update();

    res.json(dataReturn(data, "wallet"));
};

export const walletDelete = async (req: CustomRequest, res: Response) => {
    const walletObj = {
        id: parseInt(req.params.id),
    };
    const wallet = new Wallet(walletObj);
    const data = await wallet.remove();
    res.json(dataReturn(data, "wallet", "item removido"));
};
