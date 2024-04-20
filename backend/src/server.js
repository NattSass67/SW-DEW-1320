const express = require('express');
const cors = require('cors');
const auth = require('./routes/auth');
const booking = require('./routes/booking')
const dentist = require('./routes/dentist')
const app = express();

app.use(cors());
app.use(express.json());


//apis-endpoint 
app.use(auth);
app.use(booking);
app.use(dentist);

app.listen(5000, function () {
    console.log("Server PROJECT running on port 5000!");
});
