// pages/books/[id]/index.js

import React, { useEffect, useState } from 'react';
import styles from './BookDetail.module.css';
import { useRouter } from 'next/router';

const BookDetailPage = () => {
    const [book, setBook] = useState(null); // State for book details
    const [loading, setLoading] = useState(true); // State for loading
    const router = useRouter();
    const { id } = router.query; // Get the book id from URL

    useEffect(() => {
        const fetchBookData = async () => {
            if (!id) return; // If no id, exit early

            try {
                const response = await fetch(`/api/${id}`); // API call to fetch book data
                const data = await response.json();
                if (data) {
                    setBook(data); // Set the book data
                } else {
                    setBook(null); // Book not found
                }
            } catch (error) {
                console.error('Error fetching book data:', error);
                setBook(null); // In case of error, set book to null
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchBookData(); // Fetch book data when component mounts or id changes
    }, [id]);

    if (loading) {
        return <div>Loading...</div>; // Show loading message while fetching data
    }

    if (!book) {
        return <div>Book not found</div>; // Display if book is not found
    }

    const handleAuthorClick = () => {
        router.push(`/books/${book.id}/author`);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{book.title}</h1>
            <p className={styles.description}>{book.description}</p>
            <div className={styles.details}>
                <div className={styles.detailItem}>Author ID: {book.authorId}</div>
                <div className={styles.detailItem}>Genre ID: {book.genreId}</div>
                <div className={`${styles.detailItem} ${styles.price}`}>Price: ${book.price}</div>
                <div className={`${styles.detailItem} ${styles.rating}`}>Rating: {book.rating}/5</div>
            </div>
            <button onClick={() => window.history.back()} className={styles.backButton}>
                Back to Books
            </button>
            <button onClick={handleAuthorClick} className={styles.backButton}>
                View Author Information
            </button>
        </div>
    );
};

export default BookDetailPage;
