import axios from "./axios";

export const getBooksRequest = async () => axios.get("/book");

export const createBookRequest = async (book) => axios.post("/book", book);

export const updateBookRequest = async (book) =>
    axios.put(`/book/${book._id}`, book);

export const deleteBookRequest = async (id) => axios.delete(`/book/${id}`);

export const getBookRequest = async (title) => axios.get(`/book/${title}`);