const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection (option 1)
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",       
//   password: "",       
//   database: "contact_app"
// });
const db = mysql.createConnection({
  host: "localhost",
  user: "webuser",
  password: "webpass123",  // or stronger password if you chose Option 1
  database: "contact_app"
});


db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected!");
});

// API Route to save form data
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ success: true, id: result.insertId });
  });
});

//listen to port
app.listen(5000, () => {
  console.log(" Server running on http://localhost:5000");
});
