import axios from "./axios";

export const getLoansRequestEmp = async () => axios.get("/loan");

export const getLoansRequest = async (email) => axios.get(`/loan/${email}`);

export const createLoanRequest = async (loan) => axios.post("/loan", loan);

export const updateLoanRequest = async (loan) =>
    axios.put(`/loan/${loan._id}`, loan);

export const deleteLoanRequest = async (id) => axios.delete(`/loan/${id}`);
