var mysql = require("mysql");
const express = require("express");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1206",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "users",
});

// Create an Express application
const app = express();

// Define a route to fetch all users
app.get("/users", (req, res) => {
  // Execute a query to select all users
  pool.query("SELECT * FROM user", (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error });
    }
    res.json(results);
  });
});

// Route to fetch user by ID
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;

  pool.query("SELECT * FROM user WHERE id = ?", userId, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error });
    }
    res.json(results);
  });
});

// Route to fetch user by email
app.get("/users/email/:email", (req, res) => {
  const userEmail = req.params.email;

  pool.query(
    "SELECT * FROM user WHERE email = ?",
    userEmail,
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        return res
          .status(500)
          .json({ error: "Internal Server Error", details: error });
      }
      res.json(results);
    }
  );
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});

function getClicked() {
  const query = document.getElementById("firstInput").value;
  console.log("Query: " + query);
}

function logIn() {
  const email = document.getElementById("emailInput").value;
  console.log("Email: " + email);
  const password = document.getElementById("passwordInput").value;
  console.log("Password: " + password);
}
