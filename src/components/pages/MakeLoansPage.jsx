import { useForm } from "react-hook-form";
import { useLoans } from "../shared/context/LoanContext";
import { useBooks } from "../shared/context/BookContext";
import { useEffect } from "react";
import { useAuth } from "../shared/context/AuthContext";

export default function MakeLoansPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { createLoan } = useLoans();

  const { booksStock, getBooksStock } = useBooks();

  const { user } = useAuth();

  useEffect(() => {
    getBooksStock()
  }, []);

  const onSubmit = handleSubmit((data) => {
    data.user_email = user.email
    createLoan(data);
  })

  return (
    <div className="mx-auto max-w-270">

      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white text-center">
                Loan Information
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={onSubmit}>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Book name
                    </label>
                    <div className="relative">
                      <select
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        {...register("book_name", {
                          required: {
                            value: true,
                            message: "Book name is required",
                          },
                        })}>
                        {booksStock.map((item) => (
                          <option key={item.title} value={item.title}>
                            {item.title}
                          </option>
                        ))}
                      </select>

                      {errors.book_name && <span>{errors.book_name.message}</span>}
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Pick up date
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="date"
                      {...register("pickup_date", {
                        required: {
                          value: true,
                          message: "Date is required",
                        },
                      })}
                    />
                    {errors.pickup_date && <span>{errors.pickup_date.message}</span>}
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                    type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
