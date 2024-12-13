import { useEffect, useState } from "react"; // Ensure useState is imported
import { useRouter } from "next/router"; // Import useRouter
import styles from './index.module.css';
import Book from "@/Components/Books";
import Genre from "@/Components/Genre";
import SearchBar from "@/Components/Search/SearchBar";

export default function FeaturedEventsPage() {
  const [books, setBooks] = useState([]); // State for books
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books
  const [genres, setGenres] = useState([]); // State for genres
  const [loading, setLoading] = useState(true); // Loading state
  
  const router = useRouter(); // Initialize router

  useEffect(() => {
    async function loadData() {
      try {
        const bookResponse = await fetch('/api/books'); // Fetch books from your API
        const genreResponse = await fetch('/api/genres'); // Fetch genres from your API
        const booksData = await bookResponse.json();
        const genresData = await genreResponse.json();

        setBooks(booksData.books);
        setFilteredBooks(booksData.books); // Initialize filtered books with all books
        setGenres(genresData.genres); // Set genres
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleGenreChange = (genreId) => {
    // Filter books based on selected genre
    if (genreId) {
      const filtered = books.filter(book => book.genreId === genreId);
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books); // Reset to all books if no genre is selected
    }
  };

  const handleSearch = (query) => {
    // Filter books based on the search query
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleClick = () => {
    router.push('/genres'); // Navigate to the genres page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "cursive" }}>
      <h1>Home Page: All Featured Books</h1>
      
      <h2>Books:</h2>
      <Book list={filteredBooks} /> {/* Ensure the Book component is designed to display books */}
      {/* <button className={styles.button} onClick={handleClick}>View Genre</button> */}
    </div>
  );
}
