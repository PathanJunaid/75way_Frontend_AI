import asyncHandler from "express-async-handler";
import { type Request, type Response } from 'express';
import * as transactionServices from './transaction.services'
import { createResponse } from "../common/helper/response.hepler";

export const getallTransactions = asyncHandler(async (req: Request, res: Response) => {
    const result = await transactionServices.getallTransactions();
    res.send(createResponse(result, "All transactions"))
});
