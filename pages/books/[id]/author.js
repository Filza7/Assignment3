import React, { useEffect, useState } from 'react';
import Authors from '../../../Components/Authors';
import styles from './author.module.css';

const BookAuthorPage = ({ authorId }) => {
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await fetch('/api/authors'); // Fetch the authors list
                const authors = await response.json();
                const selectedAuthor = authors.find(author => author.id.toString() === authorId); // Find the specific author
                setAuthor(selectedAuthor); // Set the specific author data
            } catch (error) {
                console.error("Error fetching author:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthor();
    }, [authorId]); // Runs whenever the authorId changes

    if (loading) {
        return <div>Loading author...</div>;
    }

    if (!author) {
        return <div>Error loading author information.</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Author Information</h1>
            <Authors list={[author]} /> {/* Only pass the specific author */}
        </div>
    );
};

export async function getStaticPaths() {
    // Fetch the books data to get the list of IDs for static paths
    const response = await fetch('http://localhost:3000/api/books'); // Adjust the URL as needed
    const books = await response.json();
    const paths = books.map((book) => ({
        params: { id: book.id.toString() },
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    return {
        props: {
            authorId: params.id, // Pass the book's authorId to fetch the author's details
        },
    };
}

export default BookAuthorPage;
