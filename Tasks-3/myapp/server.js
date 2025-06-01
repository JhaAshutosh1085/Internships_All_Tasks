const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Correct way to handle JSON

let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "1984", author: "George Orwell" },
    { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 4, title: "1984", author: "George Orwell" }
];

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST: Add a new book
app.post('/books', (req, res) => {
    if (!req.body.title || !req.body.author) {
        return res.status(400).json({ error: "Title and Author are required" });
    }
    const newBook = { id: books.length + 1, ...req.body };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT: Update a book by ID
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const index = books.findIndex(book => book.id === parseInt(id));
    if (index !== -1) {
        books[index] = { id: parseInt(id), ...req.body };
        res.json(books[index]);
    } else {
        res.status(404).json({ error: "Book not found" });
    }
});

// DELETE: Remove a book
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    books = books.filter(book => book.id !== parseInt(id));
    res.json({ message: "Book deleted successfully" });
});

// Global error handler for JSON parsing issues
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(400).json({ error: 'Invalid JSON format' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});