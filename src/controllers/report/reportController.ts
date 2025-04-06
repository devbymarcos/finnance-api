import { Request, Response } from "express";
import SumCategoryToMonth from "../../models/report-model/SumCategoryToMonth";
import { dataReturn } from "../../helpers/functions.js";

export const cashFlowOnCategory = async (req: Request, res: Response) => {
    const wallet_id: string = String(req.query.walletId);
    const incomeObj = new SumCategoryToMonth();
    incomeObj.setWalletId(wallet_id);
    incomeObj.setTypeInvoice("income");
    const expenseObj = new SumCategoryToMonth();
    expenseObj.setWalletId(wallet_id);
    expenseObj.setTypeInvoice("expense");

    const [income, expense] = await Promise.all([
        incomeObj.execute(),
        expenseObj.execute(),
    ]);

    const dataReport = {
        income: income,
        expense: expense,
    };
    res.json(dataReturn(dataReport, "/report", ""));
};
