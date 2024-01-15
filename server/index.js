const express = require('express');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const dbConnect = require("./dbConnect")
const authRouter = require('./routers/authRouter')

const app = express();
dotenv.config("./.env");


//middlewares
app.use(bodyParser.json());


app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 3001;
dbConnect()
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
