const express = require("express");
const cors = require('cors')
const UserRoute = require('./routes/UserRoute.js')
const VillageRoute = require('./routes/VillageRoute.js')
const PeopleRoute = require('./routes/PeopleRoute.js')
const path = require('path')
const dotenv = require('dotenv')
const dbconnection = require('./config/dbConnection.js')
// dbconnection();
dotenv.config();
const app = express();
const fs = require('fs');

const fileUpload = require("express-fileupload");
const { fileURLToPath } = require('url');

app.use(cors());
app.use(express.json());

app.use('/api/user', UserRoute)
app.use('/api/village', VillageRoute)
app.use('/api/people', PeopleRoute)
app.get('/village/image/:fileName', (req, res) => {
    console.log(req.params.fileName)
    fs.readFile('./media/village/' + req.params.fileName, (err, data) => {
        if (err) res.send('file not found'); // Fail if the file can't be read.
        res.end(data);
    })
});
app.listen(5000, () => {
    console.log('Your app is running on http://localhost:5000');
})