import asyncHandler from "express-async-handler";
import { type Request, type Response } from 'express';
import axios from "axios";

import * as transactionServices from '../transactions/transaction.services'
import { createResponse } from "../common/helper/response.hepler";
import { transactionData } from './personal_transactions';

export const predict = asyncHandler(async (req: Request, res: Response) => {
    // const result = await transactionServices.getallTransactions();
    // const trans = transactionData
    const pythonServerURL = "http://127.0.0.1:8000/predict-spending"; // Python server on port 5000
    // Send data to FastAPI
    try {
        const response = await axios.post(pythonServerURL, {
            months: Number(req.params.id),
            transactions: transactionData
        }, {
            headers: { "Content-Type": "application/json" }
        });
        res.send(createResponse(response.data, 'Prediction'))
        return
    } catch (e) {
        res.send(createResponse(e,'error'))
        return
    }
});