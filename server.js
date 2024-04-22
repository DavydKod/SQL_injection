var mysql = require("mysql");
const express = require("express");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1206",
  port: 3306,
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
  password: "1206",
  database: "users",
});

// Create an Express application
const app = express();

app.use(cors(corsOptions)); // Use this after the variable declaration
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

app.get("/users/email/:email", (req, res) => {
  const userEmail = req.params.email;
  const query = `SELECT * FROM user WHERE email = ${userEmail}`;
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error });
    }
    res.json(results);
  });
});

/*
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
});*/

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});

function getClicked() {
  const query = document.getElementById("firstInput").value;
  console.log("Query: " + query);
  fetch(`http://localhost:3000/users/email/${query}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Помилка:", error);
    });
}

function logIn() {
  const email = document.getElementById("emailInput").value;
  console.log("Email: " + email);
  const password = document.getElementById("passwordInput").value;
  console.log("Password: " + password);
}
