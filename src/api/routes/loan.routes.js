import { Router } from 'express';
import {
    createLoan,
    deleteLoan,
    getLoansEmp,
    getLoans,
    approveLoan,
} from '../controllers/v1/loan.controller.js';
import { auth } from '../middlewares/validateToken.js';

const appLoan = Router();

appLoan.get("/", getLoansEmp);

appLoan.post("/", createLoan);

appLoan.get("/:email", getLoans);

appLoan.put("/:id", approveLoan);

appLoan.delete("/:id", deleteLoan);

export default appLoan;