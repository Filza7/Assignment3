import { useEffect, useState } from "react";
import Book from "@/Components/Books";
import SearchBar from "@/Components/Search/SearchBar";

export default function FeaturedEventsPage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("/api/books"); 
        const data = await response.json();
        setBooks(data); // Set full list of books
        setFilteredBooks(data); 
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  const handleSearch = (query) => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "cursive" }}>
      <SearchBar onSearch={handleSearch} />
      <h1>Home Page: All Featured Books</h1>
      <Book list={filteredBooks} />
    </div>
  );
}
