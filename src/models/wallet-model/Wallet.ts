import { prisma } from "../../database/prismaClient.js";
import { dataReturn } from "../../helpers/functions.js";
import { WalletTypes } from "./types";

class Wallet {
    private id?: number;
    private user_id!: number;
    private name!: string;
    private description!: string;
    private option_wallet!: number;

    public getId() {
        return this.id;
    }
    public setId(id: number) {
        this.id = id;
    }
    public getUserId() {
        return this.user_id;
    }
    public setUserId(user_id: number) {
        this.user_id = user_id;
    }
    public getName() {
        return this.name;
    }
    public setName(name: string) {
        this.name = name;
    }
    public getDescription() {
        return this.description;
    }
    public setDescription(description: string) {
        this.description = description;
    }
    public getOptionWallet() {
        return this.option_wallet;
    }
    public setOptionWallet(option_wallet: number) {
        this.option_wallet = option_wallet;
    }

    async findyAll() {
        try {
            const wallet = await prisma.app_wallet.findMany({
                where: {
                    user_id: this.user_id,
                },
            });

            if (!wallet) {
                return dataReturn(null, false, "Wallet not found");
            }
            return dataReturn(wallet, true, "Requisição realizada com sucesso");
        } catch (err) {
            console.log(err);
            return false;
        } finally {
            prisma.$disconnect();
        }
    }
    async findyById() {
        try {
            const wallet = await prisma.app_wallet.findUnique({
                where: {
                    id: this.id,
                },
            });
            if (!wallet) {
                return dataReturn(null, false, "Wallet not found");
            }
            return dataReturn(wallet, true, "Requisição realizada com sucesso");
        } catch (err) {
            console.log(err);
            return dataReturn(null, false, "Error ");
        } finally {
            prisma.$disconnect();
        }
    }

    async remove() {
        try {
            const wallet = await prisma.app_wallet.delete({
                where: {
                    id: this.id,
                },
            });
            if (!wallet) {
                return dataReturn(null, false, "Wallet not found");
            }
            return dataReturn(wallet, true, "Requisição realizada com sucesso");
        } catch (err) {
            console.log(err);
            return false;
        } finally {
            prisma.$disconnect();
        }
    }

    async update() {
        try {
            const wallet = prisma.app_wallet.update({
                where: {
                    id: this.id,
                },
                data: {
                    name: this.name,
                    description: this.description,
                    option_wallet: this.option_wallet,
                },
            });

            if (!wallet) {
                return dataReturn(null, false, "Wallet not found");
            }
            return dataReturn(wallet, true, "Requisição realizada com sucesso");
        } catch (err) {
            console.log(err);
            return dataReturn(null, false, "Error ");
        } finally {
            prisma.$disconnect();
        }
    }
    async register() {
        try {
            const wallet = await prisma.app_wallet.create({
                data: {
                    user_id: Number(this.user_id),
                    name: this.name,
                    description: this.description,
                    option_wallet: this.option_wallet,
                },
            });

            return dataReturn(wallet, true, "Requisição realizada com sucesso");
        } catch (err) {
            console.log(err);
            return dataReturn(null, false, "Error or not found");
        } finally {
            prisma.$disconnect();
        }
    }

    async getWalletBalance() {
        try {
            const walletBalance: Array<{
                name: string;
                balance: number;
            }> =
                await prisma.$queryRaw`SELECT w.name,w.id,(SUM(CASE WHEN i.type = 'income' THEN i.price ELSE 0 END) - SUM(CASE WHEN i.type = 'expense' THEN i.price ELSE 0 END)) AS balance FROM app_wallet w LEFT JOIN app_invoice i ON w.id = i.wallet_id WHERE w.user_id =${this.user_id} GROUP BY w.id, w.name`;

            if (!walletBalance) {
                return dataReturn(null, false, "Wallet not found");
            }
            return dataReturn(
                walletBalance,
                true,
                "Requisição realizada com sucesso"
            );
        } catch (err) {
            console.log(err);
            return dataReturn(null, false, "Error or not found");
        }
    }
}

export default Wallet;
