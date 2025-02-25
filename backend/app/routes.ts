import express from "express";

import userRoutes from "./user/user.route";
import  authRoutes   from "./common/auth/auth.routes";
import transactionRoute from "./transactions/transaction.routes";
import predictRoute from "./predict/predict.routes";

// routes
const router = express.Router();

router.use("/users", [userRoutes,authRoutes]);
router.use("/transactions", transactionRoute);
router.use("/predict", predictRoute);
export default router;