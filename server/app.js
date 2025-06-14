const express = require('express');
const app = express();
const cors = require ('cors');
require('dotenv').config();


app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(cors({
  origin: ['https://loop-app.net', 'https://www.loop-app.net'], // allow both domains
  credentials: true
}));

const db = require('./models');

const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);


db.sequelize.sync({ alter: true }).then(() => {
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    });
});

