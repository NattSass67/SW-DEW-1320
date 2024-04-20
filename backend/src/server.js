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
    console.log("BOOKING-Service-----------\n")
    console.log('GET /api/booking');
    console.log('GET /api/booking/:id');
    console.log('GET /api/admin/booking');
    console.log('POST /api/booking');
    console.log('PUT /api/booking/:id');
    console.log('PUT /api/admin/booking/:id');
    console.log('DELETE /api/booking/:id');
    console.log('DELETE /api/admin/booking/:id\n');
    console.log("Auth-Service-----------")
    console.log('POST /api/auth/register');
    console.log('POST /api/auth/login\n');
    console.log("Deentist-Service-----------")
    console.log('GET /api/dentist');
    console.log('GET /api/dentist/:id');
    console.log('POST /api/dentist');
    console.log('PUT /api/dentist/:id');
    console.log('DELETE /api/dentist/:id');
});
