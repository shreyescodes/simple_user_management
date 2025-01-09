# simple_user_management

A step-by-step guide to building a fully functional User Management System using HTML, CSS, and JavaScript. This project implements CRUD operations and data persistence with `localStorage`.

---

## **Features**

- Add, edit, and delete user details (name, email, phone).
- Dynamic and responsive user table.
- Data persistence with `localStorage`.

---

## **Project Structure**

```plaintext
simple_user_management/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   └── userService.js
└── README.md
```

---

## **Getting Started**

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/user-management.git
cd user-management
```

### 2. Open the Application
Simply open `index.html` in your browser.

---

## **Implementation Details**

### HTML
The backbone of the application, with a form for input and a table for displaying data dynamically.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <title>User Management</title>
</head>
<body>
    <div class="container">
        <h1>User Management System</h1>
        <form id="userForm">
            <input type="hidden" id="userId">
            <label for="name">Name:</label>
            <input type="text" id="name" required>

            <label for="email">Email:</label>
            <input type="email" id="email" required>

            <label for="phone">Phone:</label>
            <input type="tel" id="phone" required>

            <button type="submit">Submit</button>
        </form>

        <table id="userTable">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="userList"></tbody>
        </table>
    </div>
    <script src="js/userService.js"></script>
    <script src="js/app.js"></script>
</body>
</html>
```

---

### CSS
Provides styling for a clean and user-friendly interface.

```css
body {
    font-family: Arial, sans-serif;
    background: #f5f5f5;
    margin: 0;
    padding: 20px;
}

.container {
    max-width: 800px;
    margin: auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button {
    background: #007BFF;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    background: #0056b3;
}

.user-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.user-table th, .user-table td {
    text-align: left;
    padding: 10px;
    border: 1px solid #ddd;
}

.user-table th {
    background: #f4f4f4;
}
```

---

### JavaScript

#### **`userService.js`**
Handles CRUD operations and data persistence with `localStorage`.

```javascript
class UserService {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
    }

    getUsers() {
        return this.users;
    }

    addUser(user) {
        this.users.push(user);
        this.saveUsers();
    }

    updateUser(index, user) {
        this.users[index] = user;
        this.saveUsers();
    }

    deleteUser(index) {
        this.users.splice(index, 1);
        this.saveUsers();
    }

    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }
}

const userService = new UserService();
```

#### **`app.js`**
Links the UI to the `UserService` class, enabling dynamic interactions.

```javascript
const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

function displayUsers() {
    const users = userService.getUsers();
    userList.innerHTML = users.map((user, index) => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>
                <button onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function editUser(index) {
    const user = userService.getUsers()[index];
    document.getElementById('userId').value = index;
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;
}

function deleteUser(index) {
    userService.deleteUser(index);
    displayUsers();
}

userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userId = document.getElementById('userId').value;
    const user = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    if (userId === '') {
        userService.addUser(user);
    } else {
        userService.updateUser(userId, user);
    }

    userForm.reset();
    displayUsers();
});

displayUsers();
```

---

## **Conclusion**

This project provides a hands-on way to understand CRUD operations, dynamic data handling, and data persistence using `localStorage`. Extend this project by adding features like search, filtering, or integrating with a backend service.
