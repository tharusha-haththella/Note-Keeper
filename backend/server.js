import mysql from "mysql";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;
const host = "127.0.0.1";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "keeper_notes",
});

db.connect();

app.get("/", async (req, res) => {
  const sql = "SELECT * FROM notes"; //fetch all the notes in the database when loading the homescreen
  await db.query(sql, (error, results) => {
    error ? console.log(error) : res.json(results); //sending the results obtained by the query to the frontend
  });
});

app.post("/add", async (req, res) => {
  const note = [req.body.title, req.body.content]; //get the note object which came from the frontend
  const sql = "INSERT INTO notes (title, content) VALUES (?)"; //insert the note to the database

  await db.query(sql, [note], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Note added to the database successfully!");
    }
  });
});

app.delete("/delete/:id", async (req, res) => {
  const id = parseInt(req.params.id); //extract the id of the note which is supposed to delete from the database from the request and parsing it into an int
  const sql = "DELETE FROM notes WHERE id=(?)";

  await db.query(sql, id, (err) => {
    err ? console.log(err.message) : console.log("Note deleted successfully!");
  });
});

const server = app.listen(port, host, () => {
  console.log(`Listening to ${server.address().port}`);
});
