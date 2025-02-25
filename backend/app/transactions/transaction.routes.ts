import { Router } from "express";
import * as transactionController from './transactions.controllers';

const transactionRoute = Router();

transactionRoute
    .get('/',transactionController.getallTransactions)

export default transactionRoute;