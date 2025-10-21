Perfect 👍 — here’s the **complete `README.md` file** version (ready to paste directly into your project root):

---

```markdown
# 📝 Blog API Project

A full-stack **Blog Application** built with **Node.js (Express)** for the backend and **React (Vite)** for both the **Admin** and **User** frontends.  
The backend handles user authentication, post management, and database operations with **PostgreSQL**.  
The app is deployed on **Render** (backend) and **Vercel** (frontend).

---

## 🚀 Tech Stack

### **Backend**
- Node.js  
- Express.js  
- PostgreSQL  
- bcrypt (for password hashing)  
- jsonwebtoken (for authentication)  
- dotenv (for environment configuration)  
- cors (for handling cross-origin requests)

### **Frontend (Admin + User)**
- React (Vite)
- Axios (for API requests)
- React Router DOM
- CSS (for styling)

---

## 📂 Project Structure

```

blog-api/
│
├── server/                  # Backend
│   ├── controllers/         # Contains logic for user, post, and auth routes
│   ├── db/                  # Database connection & seed scripts
│   ├── middleware/          # Authentication middleware
│   ├── models/              # Query logic for users and posts
│   ├── routes/              # Express route definitions
│   ├── app.js               # Main Express app entry point
│   ├── package.json
│   └── .env
│
├── client-admin/            # Admin Frontend (Vite + React)
│   ├── src/
│   ├── vite.config.js
│   └── package.json
│
└── client-user/             # User Frontend (Vite + React)
├── src/
├── vite.config.js
└── package.json

```

---

## ⚙️ Environment Variables

The following variables should be added to your **`.env`** file in the backend:

```

PORT=3000
DB_URL=postgresql://<username>:<password>@<host>:<port>/<database_name>
JWT_SECRET=<your_secret_key>
FRONTEND_URLS=[http://127.0.0.1:5173](http://127.0.0.1:5173), [http://127.0.0.1:5174](http://127.0.0.1:5174), [https://your-admin.vercel.app](https://your-admin.vercel.app), [https://your-user.vercel.app](https://your-user.vercel.app)
ADMIN_EMAIL=<your_admin_email>
ADMIN_PASSWORD=<your_admin_password>

````

---

## 🧠 Features

### **Backend**
✅ User authentication (login, JWT-based auth)  
✅ Role-based access (Admin & User)  
✅ Create, edit, and delete blog posts (Admin only)  
✅ Fetch published posts (Public access)  
✅ Secure password encryption  
✅ Environment-based configuration (local vs production)

### **Admin Frontend**
✅ Login as admin  
✅ Create, edit, and delete blog posts  
✅ View all posts (drafts + published)  
✅ Responsive design

### **User Frontend**
✅ View all published posts  
✅ Read single blog post pages  
✅ “Back to Top” navigation and clean layout

---

## 🛠️ Running Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/odai307/Blog-API.git
cd Blog-API
````

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file with the variables listed above.

### 3️⃣ Seed the Database

If you want to populate your database and create an admin:

```bash
npm run seed
```

### 4️⃣ Start the Backend

```bash
npm start
```

The backend runs on `http://localhost:3000`.

---

### 5️⃣ Admin Frontend Setup

```bash
cd ../client-admin
npm install
npm run dev
```

### 6️⃣ User Frontend Setup

```bash
cd ../client-user
npm install
npm run dev
```

Both frontends run on Vite’s default ports (`5173` or `5174`).

---

## 🌍 Deployment

### **Backend (Render)**

* Service Type: **Web Service**
* Build Command: `npm install`
* Start Command: `npm start`
* Add environment variables under **"Environment"** section in Render.
* Use your Render **PostgreSQL External URL** in `DB_URL`.

### **Frontend (Vercel)**

Each frontend (Admin & User) is deployed separately.

#### Admin Frontend (Vercel)

* Framework: **Vite (React)**
* Build Command: `npm run build`
* Output Directory: `dist`
* Environment Variable:

  ```
  VITE_API_BASE_URL=https://blog-api-chms.onrender.com
  ```

#### User Frontend (Vercel)

* Framework: **Vite (React)**
* Build Command: `npm run build`
* Output Directory: `dist`
* Environment Variable:

  ```
  VITE_API_BASE_URL=https://blog-api-chms.onrender.com
  ```

---

## 🧑‍💻 API Endpoints

| Method | Endpoint               | Description               | Auth   |
| ------ | ---------------------- | ------------------------- | ------ |
| POST   | `/api/auth/login`      | Login user/admin          | Public |
| GET    | `/api/posts/published` | Fetch all published posts | Public |
| POST   | `/api/posts`           | Create a new post         | Admin  |
| PUT    | `/api/posts/:id`       | Edit a post               | Admin  |
| DELETE | `/api/posts/:id`       | Delete a post             | Admin  |

---

## 👨‍💼 Admin Account

When seeded, the app automatically creates an admin with:

* **Email:** from `.env` (`ADMIN_EMAIL`)
* **Password:** from `.env` (`ADMIN_PASSWORD`)

You can then log in through the Admin frontend to manage posts.

---

## 🌐 Live Links

| Service                     | URL                                                                              |
| --------------------------- | -------------------------------------------------------------------------------- |
| **Backend (Render)**        | [https://blog-api-chms.onrender.com](https://blog-api-chms.onrender.com)         |
| **Admin Frontend (Vercel)** | [https://blog-api-zeta-tawny.vercel.app](https://blog-api-zeta-tawny.vercel.app) |
| **User Frontend (Vercel)**  | [https://blog-api-user.vercel.app](https://blog-api-user.vercel.app)             |

---

## ❤️ Author

**Gabriel Afotey**
📧 [gabrielafotey@gmail.com](mailto:gabrielafotey@gmail.com)
GitHub: [@odai307](https://github.com/odai307)

```
