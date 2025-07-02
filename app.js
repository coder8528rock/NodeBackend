// app.js

const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 3000;

app.use(express.json());

// Create connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root", // your MySQL username
  password: "abhi@123", // your MySQL password
  database: "testdb", // your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Sample route to test DB connection
app.get("/users", (req, res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      console.error("Error while querying:", error);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
