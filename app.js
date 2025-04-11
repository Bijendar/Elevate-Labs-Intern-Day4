const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const auth = require('./auth');

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

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app; // For testing purposes