const User = require('../models/user');

// הוספת משתמש חדש
exports.addUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.send(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// מחיקת משתמש לפי מזהה
exports.deleteUserById = async (req, res) => {
  const { password } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ password });
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Failed to delete user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

// קריאת כל המשתמשים
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// קריאת משתמש לפי מזהה
exports.getUserById = async (req, res) => {
  const { password } = req.params;
  try {
    const user = await User.findOne({ password }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// עדכון משתמש לפי מזהה
exports.updateUserById = async (req, res) => {
  const { password } = req.params;
  const { username, email } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { password },
      { username, email },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Failed to update user:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
};