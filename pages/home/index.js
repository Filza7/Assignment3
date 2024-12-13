import { useEffect, useState } from "react"; 
import { useRouter } from "next/router"; 
import styles from './index.module.css';
import Book from "@/Components/Books";
import Genre from "@/Components/Genre";
import SearchBar from "@/Components/Search/SearchBar";

export default function FeaturedEventsPage() {
  const [books, setBooks] = useState([]); 
  const [filteredBooks, setFilteredBooks] = useState([]); 
  const [genres, setGenres] = useState([]); 
  const [loading, setLoading] = useState(true); 
  
  const router = useRouter(); 

  useEffect(() => {
    async function loadData() {
      try {
        const bookResponse = await fetch('/api/books'); 
        const genreResponse = await fetch('/api/genres'); 
        const booksData = await bookResponse.json();
        const genresData = await genreResponse.json();

        setBooks(booksData.books);
        setFilteredBooks(booksData.books); 
        setGenres(genresData.genres); 
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
      setFilteredBooks(books); 
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
    router.push('/genres'); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "cursive" }}>
      <h1>Home Page: All Featured Books</h1>
      
      <h2>Books:</h2>
      <Book list={filteredBooks} /> 
      {/* <button className={styles.button} onClick={handleClick}>View Genre</button> */}
    </div>
  );
}
