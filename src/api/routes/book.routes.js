import { Router } from 'express';
import {
    createBook,
    deleteBook,
    getBook,
    getBooks,
    updateBook,
} from '../controllers/v1/book.controller.js';
import { auth } from '../middlewares/validateToken.js';

const appBook = Router();


appBook.get("/", getBooks);

appBook.post("/", createBook);

appBook.get("/:title", getBook);

appBook.put("/:id", updateBook);

appBook.delete("/:id", deleteBook);

export default appBook;