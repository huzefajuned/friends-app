const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// import routes
const authRoutes = require("./routes/auth");
const usersRoutes = require ('./routes/users')
const friendsRoutes = require ('./routes/friends')

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())
// app.use(cors({
//   origin: 'http://localhost:5173'
// }));

// Connect to MongoDB
mongoose  
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/test", (req, res) => {
  res.status(200).json({ message: "All ok !", data: [] });
});

app.use("/api/auth", authRoutes);
app.use('/api/users', usersRoutes)

app.use('/api/friends', friendsRoutes)

const PORT = process.env.PORT || 3301;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
