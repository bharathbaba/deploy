const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });

  try {
    await newUser.save();
    res.send('User Registered Successfully');
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email, password });
  
      if (user) {
        const currentUser = {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          _id: user._id
        };
  
        res.send(currentUser);
      } else {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Server error.' });
    }
  });
  
module.exports = router;
