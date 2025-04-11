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
  // Input validation
  if (!userId || !requiredRole) {
    return false;
  }
  
  // Get all users from the users module
  const allUsers = usersModule.getAllUsersWithCredentials();
  const user = allUsers.find(u => u.id === userId);
  
  return user && user.role === requiredRole;
}

module.exports = {
  authenticate,
  checkRole
};