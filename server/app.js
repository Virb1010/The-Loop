const express = require('express');
const app = express();
const cors = require ('cors');

app.use(express.json());

app.use(cors({
  origin: ['https://loop-app.net', 'https://www.loop-app.net'], // allow both domains
  credentials: true
}));

const db = require('./models');

// routers
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    });
});

