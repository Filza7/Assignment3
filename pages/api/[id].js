import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const { id } = req.query; // Get the book ID from the query parameter

    const filePath = path.join(process.cwd(), 'public', 'data.json'); // Path to your data.json file
    
    try {
        const fileData = fs.readFileSync(filePath, 'utf8'); // Read the file synchronously
        const data = JSON.parse(fileData); // Parse the file content to JSON

        // Ensure that books is an array within the parsed data
        const books = data.books; // Extract the books array from the data

        if (Array.isArray(books)) { // Ensure books is an array
            const book = books.find(b => b.id === id); // Find the book by ID

            if (book) {
                res.status(200).json(book); // Return the book details as JSON
            } else {
                res.status(404).json({ error: 'Book not found' }); // Return error if book is not found
            }
        } else {
            res.status(500).json({ error: 'Invalid data format, books is not an array' });
        }
    } catch (error) {
        console.error('Error reading file or parsing JSON:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Return server error if something goes wrong
    }
}
