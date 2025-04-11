// User management module
let users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', email: 'admin@example.com' },
  { id: 2, username: 'user', password: 'user123', role: 'user', email: 'user@example.com' }
];

/**
 * Get all users (without passwords)
 * @returns {Array} Array of users without passwords
 */
function getAllUsers() {
  return users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
}

/**
 * Get user by ID (without password)
 * @param {number} id - User ID
 * @returns {object|null} User object without password, or null if not found
 */
function getUserById(id) {
  const user = users.find(u => u.id === id);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
}

/**
 * Create a new user
 * @param {object} userData - User data
 * @returns {object} Created user without password
 */
function createUser(userData) {
  const id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = { id, ...userData };
  users.push(newUser);
  
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

/**
 * Update user by ID
 * @param {number} id - User ID
 * @param {object} userData - User data to update
 * @returns {object|null} Updated user without password, or null if not found
 */
function updateUser(id, userData) {
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...userData };
    const { password, ...userWithoutPassword } = users[index];
    return userWithoutPassword;
  }
  return null;
}

/**
 * Delete user by ID
 * @param {number} id - User ID
 * @returns {boolean} True if user was deleted, false otherwise
 */
function deleteUser(id) {
  const initialLength = users.length;
  users = users.filter(u => u.id !== id);
  return users.length !== initialLength;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};