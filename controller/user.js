var users = require("../model/data");

// get a single user
const getUser = (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === id);
  if (!user) {
    res.status(404).send(`User with id - ${id} does not exist`);
  }
  res.status(200).send(user);
};

// get all users
const getUsers = (req, res) => {
  if (users.length < 0) {
    res.status(404).send("No users at the moment.");
  }
  res.status(200).send(users);
};

// Create a new user
const createUser = (req, res) => {
  let newId = users.length + 1;
  const { name, age, address } = req.body;
  let avatar;
  if (req.file) {
    avatar = req.file.path;
  }

  if (!name || !age || !address || !avatar) {
    res.status(400).send("Please enter all required information");
  }

  const newUser = {
    id: newId,
    name: name,
    age: age,
    address: address,
    image: avatar,
  };
  // Appending the newly created user to the existing users array
  users = [...users, newUser];

  res
    .status(200)
    .json([
      { success: true },
      { data: newUser },
      { message: "User created successfully" },
    ]);
};

// Update a User record
const updateUser = (req, res) => {
  let id = req.params.id;
  const { name, age, address } = req.body;

  console.log(req.file, req.body);
  const user = users.find((user) => user.id === id);

  // Checks if the user exist
  if (!user) {
    res
      .status(404)
      .json([
        { success: false },
        { message: `User with id - ${id} does not exist` },
      ]);
  }

  // created a variable to store updated user Index
  let updatedUserIndex;
  const newUsers = users.map((user, index) => {
    if (user.id === id) {
      // storing the index of the user in the variable
      updatedUserIndex = index;
      // setting the new record to the updated user
      user.name = name || user.name;
      user.age = age || user.age;
      user.address = address || user.address;
      user.image = req.file.path || user.image;
    }
    // returning the updated array of users
    return user;
  });
  // copying the content of newUsers array to the users array
  users = newUsers;
  // extracting the updated user object from the updated users array
  const updatedUser = users[updatedUserIndex];
  res
    .status(200)
    .json([
      { success: true },
      { data: updatedUser },
      { message: "User updated successfully" },
    ]);
};

// Delete a User record
const deleteUser = (req, res) => {
  let id = req.params.id;
  const user = users.find((user) => user.id === id);

  if (!user) {
    res.status(404).send(`User with id - ${id} does not exist`);
  }

  const newUsers = users.filter((user) => user.id !== id);

  res.status(200).send(newUsers);
};

module.exports = { getUser, getUsers, createUser, updateUser, deleteUser };
