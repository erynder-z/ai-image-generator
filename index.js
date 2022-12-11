const express = require('express');
const path = require('path');
const env = require('dotenv').config();
const openaiRoutes = require('./routes/openaiRoutes');
const port = process.env.PORT || 5000;

const app = express();

// enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/openai', openaiRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
