import React, { useEffect, useState } from 'react';
import styles from './Books.module.css'; // Adjust if your CSS file is named differently
import Genre from '../Genre'; // Import Genre component

const Books = () => {
    const [books, setBooks] = useState([]); // State for books
    const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books
    const [genres, setGenres] = useState([]); // State for genres
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch books data
                const booksResponse = await fetch('/api/books'); // Replace with your API endpoint
                const booksData = await booksResponse.json();

                // Fetch genres data
                const genresResponse = await fetch('/api/genres'); // Replace with your API endpoint
                const genresData = await genresResponse.json();

                setBooks(booksData); // Set books data to state
                setFilteredBooks(booksData); // Initialize filtered books with all books
                setGenres(genresData); // Set genres data to state
            } catch (error) {
                console.error("Error fetching books or genres:", error);
            } finally {
                setLoading(false); // Set loading to false once the data is fetched
            }
        };

        fetchData(); // Call the fetchData function
    }, []); // Empty dependency array ensures this runs only once after component mounts

    const handleGenreFilter = (genreId) => {
        if (genreId) {
            const filtered = books.filter(book => book.genreId === genreId);
            setFilteredBooks(filtered); // Filter books by genre
        } else {
            setFilteredBooks(books); // Reset to all books if no genre is selected
        }
    };

    const handleExploreClick = (id) => {
        console.log('Navigating to book with ID:', id); // Debugging log
        window.location.href = `/books/${id}`; // Use window.location.href for navigation
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading message while fetching data
    }

    return (
        <div className={styles.bookContainer}>
            {/* Pass the handleGenreFilter as a prop named onGenreChange */}
            <Genre list={genres} onGenreChange={handleGenreFilter} />
            {filteredBooks.map((book) => (
                <div key={book.id} className={styles.bookCard}>
                    <div className={styles.bookTitle}>{book.title}</div>
                    <div className={styles.bookDescription}>{book.description}</div>
                    <div className={styles.bookDetails}>
                        <p>Author ID: {book.authorId}</p>
                        <p>Genre ID: {book.genreId}</p>
                        <p>Price: ${book.price}</p>
                        <p>Rating: {book.rating}/5</p>
                    </div>
                    <button onClick={() => handleExploreClick(book.id)} className={styles.button}>
                        View Details
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Books;
