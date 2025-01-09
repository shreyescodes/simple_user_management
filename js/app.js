// Initialize services and get DOM elements
const userService = new UserService();
const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');
const messageDiv = document.getElementById('messageDiv');

// Show success/error messages
function showMessage(message, isError = false) {
    messageDiv.innerHTML = `<div class="message ${isError ? 'error' : 'success'}">${message}</div>`;
    setTimeout(() => messageDiv.innerHTML = '', 3000); // Message disappears after 3 seconds
}

// Display users in the table
function displayUsers() {
    const users = userService.getUsers();
    userList.innerHTML = users.map((user, index) => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>
                <button onclick="editUser(${index})" class="action-btn edit-btn">Edit</button>
                <button onclick="deleteUser(${index})" class="action-btn delete-btn">Delete</button>
            </td>
        </tr>
    `).join('');
}


// Handle form submissions (both create and update)
userForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from submitting normally

    // Get form data
    const userId = document.getElementById('userId').value;
    const user = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    if (userId === '') {
        // Add new user
        userService.addUser(user);
        showMessage('User added successfully!');
    } else {
        // Update existing user
        userService.updateUser(userId, user);
        showMessage('User updated successfully!');
    }

    // Reset form and update display
    userForm.reset();
    document.getElementById('userId').value = '';
    userForm.querySelector('button[type="submit"]').textContent = 'Add User';
    displayUsers();
});

// Handle editing user
function editUser(index) {
    const users = userService.getUsers();
    const user = users[index];
    
    // Fill form with user data
    document.getElementById('userId').value = index;
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;
    
    // Change button text to indicate editing
    userForm.querySelector('button[type="submit"]').textContent = 'Update User';
}

// Handle deleting user
function deleteUser(index) {
    if (confirm('Are you sure you want to delete this user?')) {
        userService.deleteUser(index);
        displayUsers();
        showMessage('User deleted successfully!');
    }
}


// Initial display of users when page loads
displayUsers();