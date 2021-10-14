const express = require("express");
const upload = require("./config");
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("./controller/user");

// Port number
const port = 3000;
const app = express();
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// get all users
app.get("/user", getUsers);

// get a single user
app.get("/user/:id", getUser);

// Create a new user
app.post("/user", upload.single("avatar"), createUser);

// Update a User record
app.put("/user/:id", upload.single("avatar"), updateUser);

// Delete a User record
app.delete("/user/:id", deleteUser);

app.use((req, res, next) => {
  res.send("404 -- Page requested not found");
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/`);
});
