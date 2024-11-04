// server.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Placeholder database (for demonstration purposes)
const users = [
    { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1' },
    { id: 2, username: 'user2', email: 'user2@example.com', password: 'password2' }
];

// Route for handling login requests
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find user in the database based on username/email and password
    const user = users.find(u => (u.username === username || u.email === username) && u.password === password);

    if (user) {
        // If user is found, return success response
        res.status(200).json({ message: 'Login successful', user });
    } else {
        // If user is not found or password is incorrect, return error response
        res.status(401).json({ message: 'Invalid username/email or password' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
