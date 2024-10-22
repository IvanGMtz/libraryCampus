import { Router } from 'express';
import {
    createBook,
    deleteBook,
    getBook,
    getBooks,
    updateBook,
    getBooksWithStock
} from '../controllers/v1/book.controller.js';
import { auth } from '../middlewares/validateToken.js';

const appBook = Router();

appBook.get("/", auth, getBooks);

appBook.get("/stock", auth, getBooksWithStock);

appBook.post("/", auth, createBook);

appBook.get("/:title", auth, getBook);

appBook.put("/:id", auth, updateBook);

appBook.delete("/:id", auth, deleteBook);

export default appBook;