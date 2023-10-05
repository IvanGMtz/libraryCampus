import { createContext, useContext, useState } from "react";
import { createLoanRequest, getLoansRequest, deleteLoanRequest, updateLoanRequest, getLoansRequestEmp } from "../../../request/loan";
import { useAuth } from "./AuthContext";

const LoanContext = createContext();

export const useLoans = () => {
  const context = useContext(LoanContext);

  if (!context) {
    throw new Error("useLoans must be used within a LoanProvider");
  }
  return context;
};

export function LoanProvider({ children }) {

  const{user} = useAuth();

  const [Loans, setLoans] = useState([]);
  const [LoansEmp, setLoansEmp] = useState([]);
  const [errors, setErrors] = useState([]);

  const getLoansEmp = async () => {
    try {
      const res = await getLoansRequestEmp();
      setLoansEmp(res.data);
    } catch (error) {
      setErrors(error);
    }
  };

  const getLoans = async () => {
    try {
      const res = await getLoansRequest(user.email);
      setLoans(res.data);
    } catch (error) {
      setErrors(error);
    }
  };

  const createLoan = async (Loan) => {
    try {
      await createLoanRequest(Loan);
      alert('Loan added successfully');
    } catch (error) {
      setErrors(error);
    }
  }

  const deleteLoan = async (id) => {
    try {
      const res = await deleteLoanRequest(id);
      if (res.status === 204) setLoans(Loans.filter((Loan) => Loan._id !== id));
    } catch (error) {
      setErrors(error);
    }
  };

  const updateLoan = async (id, Loan) => {
    try {
      await updateLoanRequest(id, Loan);
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <LoanContext.Provider value={{ Loans, LoansEmp, errors, createLoan, getLoans, getLoansEmp, deleteLoan, updateLoan }}>
      {children}
    </LoanContext.Provider>
  );
}
