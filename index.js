const express = require('express');
const env = require('dotenv').config();
const openaiRoutes = require('./routes/openaiRoutes');
const port = process.env.PORT || 5000;

const app = express();

app.use('/openai', openaiRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
