const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const auth = require('./auth');
const users = require('./users');

app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to DevOps Git Demo API',
    status: 'operational'
  });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  
  const user = auth.authenticate(username, password);
  
  if (user) {
    return res.json({ success: true, user });
  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Protected route example
app.get('/admin', (req, res) => {
  // This would normally check a token, but simplified for demo
  const userId = req.headers['user-id'];
  
  if (!userId || !auth.checkRole(parseInt(userId), 'admin')) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
  
  return res.json({ message: 'Admin panel accessed successfully' });
});

// User management routes
// Get all users - admin only
app.get('/users', (req, res) => {
  const userId = req.headers['user-id'];
  
  if (!userId || !auth.checkRole(parseInt(userId), 'admin')) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
  
  return res.json(users.getAllUsers());
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.getUserById(userId);
  
  if (user) {
    return res.json(user);
  }
  
  return res.status(404).json({ error: 'User not found' });
});

// Create user - admin only
app.post('/users', (req, res) => {
  const userId = req.headers['user-id'];
  
  if (!userId || !auth.checkRole(parseInt(userId), 'admin')) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
  
  const { username, password, email, role } = req.body;
  
  if (!username || !password || !email) {
    return res.status(400).json({ error: 'Username, password, and email are required' });
  }
  
  const newUser = users.createUser({ username, password, email, role: role || 'user' });
  return res.status(201).json(newUser);
});

// Update user - admin only
app.put('/users/:id', (req, res) => {
  const userId = req.headers['user-id'];
  
  if (!userId || !auth.checkRole(parseInt(userId), 'admin')) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
  
  const id = parseInt(req.params.id);
  const userData = req.body;
  
  const updatedUser = users.updateUser(id, userData);
  
  if (updatedUser) {
    return res.json(updatedUser);
  }
  
  return res.status(404).json({ error: 'User not found' });
});

// Delete user - admin only
app.delete('/users/:id', (req, res) => {
  const userId = req.headers['user-id'];
  
  if (!userId || !auth.checkRole(parseInt(userId), 'admin')) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
  
  const id = parseInt(req.params.id);
  
  if (users.deleteUser(id)) {
    return res.status(204).send();
  }
  
  return res.status(404).json({ error: 'User not found' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app; // For testing purposes