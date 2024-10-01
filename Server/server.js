const express = require("express");
const { Schema, connect, model } = require("mongoose");
const cors = require("cors");

const app = express();

// CORS options
const corsOptions = {
    origin: "https://7-mern.vercel.app/user", // Adjust this to allow your frontend app
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions)); // Apply the CORS middleware
app.use(express.json()); // Middleware to parse JSON bodies

// Define the schema and model
const userSchema = new Schema({
  id: String,
  first_name: String,
  email: String,
  phone: String,
  role: String,
});

const UserModel = model("testingcollections", userSchema);

// Route to get all users
app.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to fetch a user by ID
app.get("/fetchUserObj/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error during fetching user by ID:", err.message);
    res
      .status(500)
      .json({ message: "Internal server error during fetching user" });
  }
});

// Route to delete a user by ID
app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error during deletion:", err.message);
    res.status(500).json({ message: "Internal server error during deletion" });
  }
});

// Route to add a new user
app.post("/addUser", async (req, res) => {
  try {
    const { id, first_name, email, phone, role } = req.body;
    const newUser = new UserModel({ id, first_name, email, phone, role });
    await newUser.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    console.error("Error during user addition:", err.message);
    res
      .status(500)
      .json({ message: "Internal server error during user addition" });
  }
});

// Route to update a user by ID
app.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    // Check if updateData has valid fields
    if (!id || !updateData) {
      return res.status(400).json({ message: "Invalid ID or data" });
    }
    const result = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error during update:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Connect to MongoDB and start the server
connect(
  "mongodb+srv://mohitharne:Rohimonu%4012@sample-cluster.f7jvq.mongodb.net/testingdatabase"
)
  .then(() => {
    app.listen(8030, () => {
      console.log("Server is running on port 8030");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
