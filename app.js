require('dotenv').config();
const express = require('express');
const app = express();
const port = 5500;

const cors = require('cors');
app.use(cors({}));

//db connection
const dbConnection = require('./db/dbConfige')

//authonthication middleware
const authMidleware = require('./middleware/authMiddleware')


//user routes middleware
const userRoutes = require('./routes/userRoute')
const questionRoutes = require('./routes/questionRoute')
const answerRoutes = require('./routes/answerRoute')

//json middleware to extract json data
app.use(express.json());

//user routes middleware
app.use('/api/users', userRoutes)

//questions routes middleware ??
app.use('/api/questions', authMidleware , questionRoutes);

//answers routes middleware ??
app.use('/api/answers', authMidleware, answerRoutes);



// Test database connection
async function start() {
  try {
    const result = await dbConnection.execute("SELECT 'test' AS message");
    await app.listen(port,)
    console.log('Database connected successfully:');
    console.log(`listening on ${port}`)



  } catch (error) {
    console.log(error.message);
  }
}

start();


