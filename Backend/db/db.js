const mysql = require("mysql2");
const { URL } = require("url");

// Load environment variables
require("dotenv").config();

// Parse the DATABASE_URL
const databaseUrl = process.env.DATABASE_URL;
const url = new URL(databaseUrl);

const db = mysql.createConnection({
  host: url.hostname,
  port: url.port,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1), // Remove the leading '/'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

// Example query
db.query("SELECT * FROM flashcards", (err, results) => {
  if (err) {
    console.error("Error fetching flashcards:", err);
    return;
  }
  console.log("Fetched flashcards:", results);
});

// Export the connection
module.exports = db;
