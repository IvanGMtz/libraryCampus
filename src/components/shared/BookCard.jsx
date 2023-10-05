import React from 'react';
import { useBooks } from './context/BookContext';
import { useAuth } from './context/AuthContext';


export default function BookCard({ book, index }) {
  
  const { deleteBook } = useBooks();
  const { isEmployee } = useAuth();

  return (
    <div className="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50 text-neutral-800">
        Book #{index + 1}
        <br />
        Stock:{book.stock}
      </div>
      <div className="p-6">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {book.title}
        </h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          {book.synopsis}
        </p>
        <div className="flex justify-between">
          <div>
            <p className="text-base text-neutral-600 dark:text-neutral-200">
              Author: {book.author}
            </p>
            <p className="text-base text-neutral-600 dark:text-neutral-200">
              Category: {book.category.map((cat) => cat.name).join(', ')}
            </p>
            <p className="text-base text-neutral-600 dark:text-neutral-200">
              Pages: {book.pages}
            </p>
          </div>
          {
            isEmployee ? (
              <>
                <button
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                  onClick={() => deleteBook(book._id)}>
                  Delete
                </button>
              </>
            ) : (
              <>
              </>
            )
          }
        </div>
      </div>
      <div className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50 text-neutral-600">
        Publication date: {book.publication_date &&
          new Date(book.publication_date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
      </div>
    </div>
  );
}
