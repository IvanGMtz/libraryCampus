import { con } from "../../../services/connection/atlas.js";
import { body, validationResult } from 'express-validator';
import { ObjectId } from "mongodb";

let db = await con();
let collection = db.collection("book");

export const getBooks = async (req, res) => {
    try {
        const Books = await collection.find({}).toArray();
        res.json(Books);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getBooksWithStock = async (req, res) => {
    try {
        const Books = await collection.find({ stock: { $gt: 0 } }).sort({ stock: -1 }).toArray();
        res.json(Books);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createBook = async (req, res) => {
    try {
        await Promise.all([
            body('title').notEmpty().run(req),
            body('author').isString().run(req),
            body('category').isArray().run(req),
            body('publisher').isString().run(req),
            body('pages').isNumeric().run(req),
            body('synopsis').isString().run(req),
            body('stock').isNumeric().run(req),
            body('publication_date').isISO8601().toDate().run(req)
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            publisher: req.body.publisher,
            pages: req.body.pages,
            synopsis: req.body.synopsis,
            stock: req.body.stock,
            publication_date: new Date(req.body.publication_date),
        }

        const result = await collection.insertOne(newBook);

        newBook.id = result.insertedId;
        newBook.createdAt = new Date();

        res.status(201).json({
            message: "Book added successfully", BookInfo: [{
                id: newBook.id,
                title: newBook.title,
                author: newBook.author,
                category: newBook.category,
                publisher: newBook.publisher,
                pages: newBook.pages,
                synopsis: newBook.synopsis,
                stock: newBook.stock,
                publication_date: newBook.publication_date,
                createdAt: newBook.createdAt
            }]
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0)
            return res.status(404).json({ message: "Book not found" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateBook = async (req, res) => {
    try {
        await Promise.all([
            body('title').notEmpty().run(req),
            body('author').isString().run(req),
            body('category').isArray().run(req),
            body('publisher').isString().run(req),
            body('pages').isNumeric().run(req),
            body('synopsis').isString().run(req),
            body('stock').isNumeric().run(req),
            body('publication_date').isISO8601().toDate().run(req)
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const updatedBook = {
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            publisher: req.body.publisher,
            pages: req.body.pages,
            synopsis: req.body.synopsis,
            stock: req.body.stock,
            publication_date: new Date(req.body.publication_date),
        };
        const result = await collection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updatedBook }
        );

        if (result.matchedCount === 0)
            return res.status(404).json({ message: "Book not found" });

        updatedBook.id = req.params.id;
        return res.json({
            message: "Book updated successfully", BookInfo: [{
                id: updatedBook.id,
                title: updatedBook.title,
                author: updatedBook.author,
                category: updatedBook.category,
                publisher: updatedBook.publisher,
                pages: updatedBook.pages,
                synopsis: updatedBook.synopsis,
                stock: updatedBook.stock,
                publication_date: updatedBook.publication_date,
                createdAt: updatedBook.createdAt
            }]
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getBook = async (req, res) => {
    try {
        const Book = await collection.findOne({ title: req.params.title });
        if (!Book) return res.status(404).json({ message: "Book not found" });
        return res.json(Book);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
