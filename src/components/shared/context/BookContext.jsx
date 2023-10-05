import { createContext, useContext, useState } from "react";
import { createBookRequest, getBooksRequest, deleteBookRequest, updateBookRequest, getBooksStockRequest } from "../../../request/book";

const BookContext = createContext();

export const useBooks = () => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [booksStock, setBooksStock] = useState([]);
  const [errors, setErrors] = useState([]);

  const getBooks = async () => {
    try {
      const res = await getBooksRequest();
      setBooks(res.data);
    } catch (error) {
      setErrors(error);
    }
  };

  const getBooksStock = async () => {
    try {
      const res = await getBooksStockRequest();
      setBooksStock(res.data);
    } catch (error) {
      setErrors(error);
    }
  };

  const createBook = async (book) => {
    try {
      await createBookRequest(book);
      alert('Book added successfully');
    } catch (error) {
      setErrors(error);
    }
  }

  const deleteBook = async (id) => {
    try {
      const res = await deleteBookRequest(id);
      if (res.status === 204) setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      setErrors(error);
    }
  };

  const updateBook = async (id, book) => {
    try {
      await updateBookRequest(id, book);
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <BookContext.Provider value={{ books, booksStock, errors, createBook, getBooks, deleteBook, updateBook, getBooksStock }}>
      {children}
    </BookContext.Provider>
  );
}
