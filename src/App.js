import "./App.css";
import { LIST_BOOKS } from "./graphql/queries/book";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { BOOKS_SUBSCRIPTION } from "./graphql/queries/book";
function App() {
  const { loading, error, data, subscribeToMore } = useQuery(LIST_BOOKS);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (data) {
      setBooks(data.listBooks);
    }
  }, [data]);

  useEffect(() => {
    subscribeToMore({
      document: BOOKS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        setBooks((books) => {
          let lastBooks = [...books];
          let newBook = subscriptionData.data.bookAdded;
          if (newBook && !lastBooks.some((b) => b._id === newBook._id)) {
            lastBooks.push(subscriptionData.data.bookAdded);
          }
          return lastBooks;
        });
      },
    });
  }, []);
  if (loading) {
    return <div>Chargement en cours</div>;
  }
  if (error) {
    console.log(error);
    return <div>Erreur!</div>;
  }
  return (
    <div className="App">
      {books.map((b) => {
        return (
          <div key={b._id}>
            Id: {b._id} Nom: {b.name}
          </div>
        );
      })}
    </div>
  );
}

export default App;
