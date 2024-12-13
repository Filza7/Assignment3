import React, { useEffect, useState } from 'react';
import styles from './Authors.module.css';

function Authors({ list }) { // Accept list of authors as a prop
  const [authors, setAuthors] = useState([]); // State to hold authors data
  const [loading, setLoading] = useState(true); // State to track loading state

  // If we are passing a single author, it should directly be displayed
  useEffect(() => {
    if (list) {
      setAuthors(list); // Set authors data passed as a prop
      setLoading(false); // Stop loading
    } else {
      const fetchAuthors = async () => {
        try {
          const response = await fetch('/api/authors'); // Fetch the authors list from API
          const data = await response.json();
          setAuthors(data); // Set authors data to state
        } catch (error) {
          console.error("Error fetching authors:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchAuthors(); // Fetch data if list is not provided
    }
  }, [list]); // Only run when the list changes

  if (loading) {
    return <div>Loading authors...</div>; // Show loading message while data is being fetched
  }

  return (
    <div className={styles.authorContainer}>
      {authors.length === 0 ? (
        <div>No authors available.</div> // If no authors, show a message
      ) : (
        authors.map((author) => (
          <div key={author.id} className={styles.authorCard}>
            <div className={styles.authorName}>{author.name}</div>
            <div className={styles.authorBio}>{author.biography}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default Authors;
