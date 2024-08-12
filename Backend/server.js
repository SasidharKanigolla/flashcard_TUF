const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/db");

const app = express();

app.use(
  cors({
    origin: "*", // Allows all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(bodyParser.json());

app.get("/flashcards", (req, res) => {
  const query = "SELECT * FROM flashcards";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching flashcards:", err);
      res.status(500).send("Server error");
    } else {
      res.json(results);
    }
  });
});

app.post("/flashcards", (req, res) => {
  const { question, answer } = req.body;
  const query = "INSERT INTO flashcards (question, answer) VALUES (?, ?)";
  db.query(query, [question, answer], (err, result) => {
    if (err) {
      console.error("Error adding flashcard:", err);
      res.status(500).send("Server error");
    } else {
      res.json({ id: result.insertId, question, answer });
    }
  });
});

app.put("/flashcards/:id", (req, res) => {
  const { question, answer } = req.body;
  const query = "UPDATE flashcards SET question = ?, answer = ? WHERE id = ?";
  db.query(query, [question, answer, req.params.id], (err, result) => {
    if (err) {
      console.error("Error editing flashcard:", err);
      res.status(500).send("Server error");
    } else {
      res.send(result);
    }
  });
});

app.delete("/flashcards/:id", (req, res) => {
  const query = "DELETE FROM flashcards WHERE id = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error("Error deleting flashcard:", err);
      res.status(500).send("Server error");
    } else {
      res.send(result);
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.port);
});
