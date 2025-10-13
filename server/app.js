const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');

app.use(cors({
  origin: ['http://127.0.0.1:5174', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');



// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);



app.get('/', (req, res) => {
    res.send('Backend is fully running');
});

app.use('', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Path not found'
    });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));