# 📝 Blog API (Node.js + Express + PostgreSQL)

A RESTful blog backend built with **Node.js**, **Express**, and **PostgreSQL**, featuring secure authentication, admin-only post management, and comment functionality.  

This project is part of a learning journey to master backend development using raw SQL queries (no ORM) and modular architecture.

---

## 🚀 Features

### 👤 Authentication
- Register and login users with JWT authentication.
- Passwords securely hashed with **bcrypt**.
- Role-based access: `admin` and `user`.

### 📰 Posts
- Admins can:
  - Create, update, and delete posts.
  - Toggle publish status (published/unpublished).
- Public users can view only **published** posts.

### 💬 Comments
- Authenticated users can add comments to published posts.
- Admins can comment on any post (even unpublished ones).
- Users can update or delete **their own** comments.
- Admins can delete any comment.

### ⚙️ Validation & Middleware
- Request validation using **express-validator**.
- Token-based authentication middleware.
- Optional authentication for viewing public data.

---

## 🧱 Project Structure

