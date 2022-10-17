const express = require('express');
const stripe = require('stripe')("sk_test_51LiJglHhAC2PEDzAR6Vrsp9YHKWgpKMDmuJX8ImommMzz10baDoUJFB0Zgc7uUVY1CE2WVogGHwFZnzhlCVMU7PY0034xhAAhK")
const cors = require('cors');
const uuid = require('uuid');
const app = express();
const dotenv = require('dotenv');

const routes = require("./routes/routes");


dotenv.config({path: './.env'});
app.use(express.json());
app.use(cors());

app.use(routes);

const port = process.env.PORT;

app.listen(port, () =>{
    console.log('App is working')
});






// Published Key is used for frontend while secret key is used in backend

