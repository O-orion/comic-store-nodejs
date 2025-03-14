const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT  || 3000;

app.listen(PORT, () => {
    console.log('Serve running on PORT: ', PORT)
})
