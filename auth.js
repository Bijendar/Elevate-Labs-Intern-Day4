// Authentication module
const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'user', password: 'user123', role: 'user' }
];

/**
 * Authenticate a user based on username and password
 * @param {string} username - The username to authenticate
 * @param {string} password - The password to verify
 * @returns {object|null} User object if authenticated, null otherwise
 */
function authenticate(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
}

/**
 * Check if user has required role
 * @param {string} userId - The user ID to check
 * @param {string} requiredRole - The role required for access
 * @returns {boolean} True if user has required role, false otherwise
 */
function checkRole(userId, requiredRole) {
  const user = users.find(u => u.id === userId);
  return user && user.role === requiredRole;
}

module.exports = {
  authenticate,
  checkRole
};