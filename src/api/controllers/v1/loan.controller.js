import { con } from "../../../services/connection/atlas.js";
import { body, validationResult } from 'express-validator';
import { ObjectId } from "mongodb";

let db = await con();
let collection = db.collection("loan");

export const getLoans = async (req, res) => {
    try {
        const Loans = await collection.find({ user_email: req.params.email}).toArray();
        res.json(Loans);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getLoansEmp = async (req, res) => {
    try {
        const Loans = await collection.find({}).toArray();
        res.json(Loans);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createLoan = async (req, res) => {
    try {
        await Promise.all([
            body('book_name').notEmpty().run(req),
            body('pickup_date').isISO8601().toDate().run(req)
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newLoan = {
            book_name: req.body.book_name,
            user_email: req.body.user_email,
            pickup_date: new Date(req.body.pickup_date),
            request_date: new Date()
        }

        const result = await collection.insertOne(newLoan);

        newLoan.id = result.insertedId;
        
        res.status(201).json({
            message: "Loan added successfully", LoanInfo: [{
                id: newLoan.id,
                book_name: newLoan.book_name,
                user_email: newLoan.user_email,
                publication_date: newLoan.publication_date,
                request_date: newLoan.request_date
            }]
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteLoan = async (req, res) => {
    try {
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0)
            return res.status(404).json({ message: "Loan not found" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const approveLoan = async (req, res) => {
    try {
        const result = await collection.updateOne(
            { _id: new ObjectId(new ObjectId(req.params.id)) },
            {
                $set: {
                    loan_date: new Date()
                }
            }
        );
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Loan not found" });
        }

        return res.status(200).json({ message: "Loan approved successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
