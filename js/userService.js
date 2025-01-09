class UserService {
  constructor() {
      // Initialize users array from localStorage or empty array if none exists
      this.users = JSON.parse(localStorage.getItem('users')) || [];
  }

  // Get all users
  getUsers() {
      return this.users;
  }

  // Add a new user
  addUser(user) {
      this.users.push(user);
      this.saveUsers();
  }

  // Update an existing user at specific index
  updateUser(index, user) {
      this.users[index] = user;
      this.saveUsers();
  }

  // Delete a user at specific index
  deleteUser(index) {
      this.users.splice(index, 1);
      this.saveUsers();
  }

  // Save users to localStorage
  saveUsers() {
      localStorage.setItem('users', JSON.stringify(this.users));
  }
}