import { Request, Response } from "express";
import { dataReturn } from "../../helpers/functions.js";
import Wallet from "../../models/wallet-model/Wallet.js";

export const wallets = async (req: Request, res: Response) => {
    const wallet = new Wallet();
    wallet.setUserId(res.locals.userAuth.id);
    const data = await wallet.findyAll();
    res.json(data);
};

export const walletCreate = async (req: Request, res: Response) => {
    const wallet = new Wallet();
    wallet.setUserId(res.locals.userAuth.id);
    wallet.setName(req.body.name);
    wallet.setDescription(req.body.description);
    wallet.setOptionWallet(parseInt(req.body.option_wallet));
    const data = await wallet.register();
    res.json(data);
};

export const walletUniq = async (req: Request, res: Response) => {
    const wallet = new Wallet();
    wallet.setUserId(res.locals.userAuth.id);
    wallet.setId(parseInt(req.params.id));
    const data = await wallet.findyById();
    res.json(data);
};

export const walletUpdate = async (req: Request, res: Response) => {
    const wallet = new Wallet();
    wallet.setId(parseInt(req.params.id));
    wallet.setUserId(res.locals.userAuth.id);
    wallet.setName(req.body.name);
    wallet.setDescription(req.body.description);
    wallet.setOptionWallet(parseInt(req.body.option_wallet));
    const data = await wallet.update();
    res.json(data);
};

export const walletDelete = async (req: Request, res: Response) => {
    const wallet = new Wallet();
    wallet.setId(parseInt(req.params.id));
    const data = await wallet.remove();
    res.json(data);
};

export const walletBalance = async (req: Request, res: Response) => {
    const wallet = new Wallet();
    wallet.setUserId(res.locals.userAuth.id);
    const data = await wallet.getWalletBalance();

    res.json(data);
};
