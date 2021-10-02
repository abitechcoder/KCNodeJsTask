const express = require("express");
const users = require("./data");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 3000;

// get a single user
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === id);
  if (!user) {
    res.status(404).send(`User with id - ${id} does not exist`);
  }
  res.status(200).send(user);
});

// get all users
app.get("/user", (req, res) => {
  res.status(200).send(users);
});

// Create a new user
app.post("/user", (req, res) => {
  let newId = users.length + 1;
  const { name, age } = req.body;

  if (!name || !age) {
    res.status(400).send("Please enter valid a data");
  }

  const newUser = {
    id: newId,
    name: name,
    age: age,
  };

  res.status(200).send([...users, newUser]);
});

// Update a User record
app.put("/user/:id", (req, res) => {
  let id = req.params.id;
  const { name, age } = req.body;
  const user = users.find((user) => user.id === id);

  if (!user) {
    res.status(404).send(`User with id - ${id} does not exist`);
  }

  const newUsers = users.map((user) => {
    if (user.id === id) {
      user.name = name;
      user.age = age;
    }
    return user;
  });

  res.status(200).send(newUsers);
});
77;

// Delete a User record
app.delete("/user/:id", (req, res) => {
  let id = req.params.id;
  const user = users.find((user) => user.id === id);

  if (!user) {
    res.status(404).send(`User with id - ${id} does not exist`);
  }

  const newUsers = users.filter((user) => user.id !== id);

  res.status(200).send(newUsers);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/`);
});
