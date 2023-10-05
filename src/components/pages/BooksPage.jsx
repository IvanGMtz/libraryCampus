import { useEffect } from "react";
import { useBooks } from "../shared/context/BookContext"
import BookCard from "../shared/BookCard";

function BooksPage() {

  const { getBooks, books } = useBooks();

  useEffect(() => {
    getBooks()
  }, []);

  return (
    <>
      {books.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <h1 className="font-bold text-xl">
              No Books yet, please add a new Book
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
        {
          books.map((book, index) => (
            <BookCard book={book} key={book._id} index={index} />
          ))
        }
      </div>
    </>
  );
}

export default BooksPage