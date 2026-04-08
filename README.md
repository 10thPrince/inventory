

# 📦 Inventory Management System (MVP)

A minimal, full-stack Inventory Management System built with **Node.js (Express)**, **MySQL**, **React.js**, **Axios**, and **TailwindCSS**.
The system provides **admin authentication**, **product CRUD**, **stock adjustments**, and a **clean React dashboard**.

---

## 🚀 Tech Stack

### **Backend**

* Node.js (ES Modules)
* Express.js
* MySQL (mysql2)
* express-session (session-based authentication)
* bcrypt (password hashing)
* dotenv

### **Frontend**

* React.js
* Axios
* TailwindCSS
* React Router

---

# 📁 Project Structure

```
inventory-mvp/
│
├── backend/
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── models/
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── api/
    │   └── App.jsx
    └── tailwind.config.js
```

---

# 🔐 Features

### ✅ **Authentication**

* Admin registration
* Login with session-based auth
* Logout functionality
* Protected routes (backend + frontend)

### 🛒 **Inventory Management**

* Add new products
* View all products
* Edit product details
* Delete products
* Increase/Decrease stock quantity
  (System prevents negative stock)

### 🎨 **Frontend**

* Simple and clean Tailwind UI
* Dashboard with product table
* Forms for creating & editing products

---

# 🗄️ Database Schema (MySQL)

### **users**

| Column     | Type         |
| ---------- | ------------ |
| id         | INT PK AUTO  |
| username   | VARCHAR      |
| email      | VARCHAR      |
| password   | VARCHAR HASH |
| created_at | TIMESTAMP    |

### **products**

| Column     | Type          |
| ---------- | ------------- |
| id         | INT PK AUTO   |
| name       | VARCHAR       |
| price      | DECIMAL(10,2) |
| quantity   | INT           |
| created_at | TIMESTAMP     |
| updated_at | TIMESTAMP     |

---

# ⚙️ Installation & Setup

## **1. Clone the Repository**

```bash
git clone https://github.com/10thPrince/inventory.git
cd inventory
```

---

# 🖥️ Backend Setup

### **2. Navigate to backend**

```bash
cd backend
```

### **3. Install dependencies**

```bash
npm install
```

### **4. Create `.env` file**

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=inventory_db
SESSION_SECRET=yourSecretKey
```

### **5. Start the backend**

```bash
npm start
```

Backend runs on:
👉 **[http://localhost:5000](http://localhost:5000)**

---

# 🌐 Frontend Setup

### **1. Navigate to frontend**

```bash
cd ../frontend
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Start frontend**

```bash
npm run dev
```

Frontend runs on:
👉 **[http://localhost:5173](http://localhost:5173)**

---

# 🔄 API Endpoints

### **Auth**

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| POST   | /auth/register | Create admin    |
| POST   | /auth/login    | Login + session |
| POST   | /auth/logout   | Logout          |

### **Products**

| Method | Endpoint               | Description    |
| ------ | ---------------------- | -------------- |
| POST   | /products              | Create product |
| GET    | /products              | List products  |
| GET    | /products/:id          | Get product    |
| PUT    | /products/:id          | Update product |
| DELETE | /products/:id          | Delete product |
| PATCH  | /products/:id/increase | Add stock      |
| PATCH  | /products/:id/decrease | Remove stock   |

---

# 🧪 Future Enhancements

* Role-based access (Admin vs Staff)
* PDF/CSV export
* Sales & Suppliers module
* Dashboard analytics
* JWT tokens (optional alternative)

---

# 🤝 Collaboration Workflow (Git)

### **Feature Branch Workflow**

```bash
git checkout -b feature-name
git add .
git commit -m "Message"
git push origin feature-name
```

### **Create Pull Requests → Code Review → Merge → Delete Branch**

Branch protection on `main` ensures quality.

---

# 📜 License

This project is open-source. You are free to modify and extend it.



Just tell me.
