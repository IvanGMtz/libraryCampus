import { useEffect } from "react";
import { useLoans } from "../shared/context/LoanContext"
import LoanCard from "../shared/LoanCard";

function LoansEmpPage() {

  const { getLoansEmp, LoansEmp } = useLoans();

  useEffect(() => {
    getLoansEmp()
  }, []);

  return (
    <>
      {LoansEmp.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <h1 className="font-bold text-xl">
              No Loans yet, please add a new Loan
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
        {
          LoansEmp.map((Loan, index) => (
            <LoanCard Loan={Loan} key={Loan._id} index={index} />
          ))
        }
      </div>
    </>
  );
}

export default LoansEmpPage