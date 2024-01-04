const createConnection = require('mysql').createConnection;

const connectToDatabase = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'my_surveydb'
});
connectToDatabase.connect(err => {
    let message = !err ? "Database Connected" : err;
    console.log("mysql : ", message);
})

module.exports = connectToDatabase;