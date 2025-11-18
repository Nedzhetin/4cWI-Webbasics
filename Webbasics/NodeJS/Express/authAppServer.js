const express = require("express");
const app = express();
const cors = require("cors");
const port = 3500;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const peopleData = [];

app.get("/users", (req, res) => {
  res.json(peopleData);
});

app.post("/register", (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  peopleData.push({ user, pwd });
  console.log("Registered user:", peopleData);
  res
    .status(201)
    .json({ success: true, message: "User registered successfully." });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
