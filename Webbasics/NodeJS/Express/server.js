const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 3000;

const peopleData = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 },
];

app.get("/people", (req, res) => {
  res.send(peopleData);
});

app.get("/people/:id", (req, res) => {
  const id = req.params.id;
  res.send(peopleData[id]);
});

app.delete("/people/:id", (req, res) => {
  const id = req.params.id;
  const deletedPerson = peopleData.splice(id, 1);
  res.send(deletedPerson[0]);
});

app.post("/people", (req, res) => {
  peopleData.push(req.body);
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
