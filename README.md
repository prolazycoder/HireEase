# 🚀 Interview Management Portal

A full-stack **Interview Management Portal** built with **Next.js** (Frontend) and **Express.js** (Backend). The application allows users to **schedule interviews, manage candidates, authenticate securely, and receive notifications** via email.

---

## 🌟 Features

✅ **Authentication** - Secure login & registration (JWT-based).  
✅ **Interview Management** - Create, update, delete, and view scheduled interviews.  
✅ **Search & Filter** - Find interviews by date, candidate, and other parameters.  
✅ **Email Notifications** - Get reminders and updates via SMTP email.  
✅ **Modern UI** - Responsive frontend built with **Next.js & Tailwind CSS**.  
✅ **Google Authentication** - Secure authentication using Google OAuth.  
✅ **User-specific Interview Management** - Manage interviews specific to each user.  
✅ **Material UI Components** - Utilize Material UI for a modern and visually appealing interface.  
✅ **RESTful API Backend** - Efficient backend implementation with Express.js and MongoDB.

---

## 📂 Project Structure

```
interview-management-portal/
│── backend/             # Express.js Backend
│── frontend/            # Next.js Frontend
│── docs/                # API Docs & Guides
│── scripts/             # Deployment Scripts
│── .gitignore           # Ignore unnecessary files
│── .env.example         # Example Environment Variables
│── README.md            # Project Documentation
│── LICENSE              # License File (Optional)
```

---

## 🚀 Tech Stack

### **Frontend**

- [Next.js](https://nextjs.org/) (React Framework)
- [Tailwind CSS](https://tailwindcss.com/) (Styling)
- [NextAuth.js](https://next-auth.js.org/) (Authentication)
- [Axios](https://axios-http.com/) (API Requests)
- [Material UI](https://mui.com/) (UI Components)

### **Backend**

- [Express.js](https://expressjs.com/) (Web Framework)
- [MongoDB](https://www.mongodb.com/) (Database)
- [Mongoose](https://mongoosejs.com/) (ODM for MongoDB)
- [JWT](https://jwt.io/) (Authentication)
- [Nodemailer](https://nodemailer.com/) (Email Notifications)

### **Deployment**

- **Frontend**: [Vercel](https://vercel.com/)
- **Backend**: [Railway](https://railway.app/)
- **Database**: MongoDB Atlas

---

## 🔧 Setup & Installation

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/your-username/interview-management-portal.git
cd interview-management-portal
```

### **2️⃣ Setup Backend**

```sh
cd backend
npm install
cp .env.example .env  # Update with your credentials
npm run dev
```

### **3️⃣ Setup Frontend**

```sh
cd ../frontend
npm install
cp .env.example .env.local  # Update with API URL
npm run dev
```

### **4️⃣ Run the Project**

Backend runs on `http://localhost:5000`, and frontend on `http://localhost:3000`.

---

## ⚙️ Environment Variables

Create a `.env` file in both `backend/` and `frontend/`.  
Example `.env` for backend:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
SMTP_HOST=smtp.yourmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
```

Example `.env.local` for frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

---

## 🚀 Deployment

### **Deploy Backend (Railway)**

```sh
cd backend
railway up
```

### **Deploy Frontend (Vercel)**

```sh
cd frontend
vercel
```

---


## 🤝 Contributing

1. **Fork** the repository.
2. **Clone** your fork: `git clone https://github.com/prolazycoder/interview-management-portal.git`.
3. **Create a new branch**: `git checkout -b feature-name`.
4. **Commit your changes**: `git commit -m "Added new feature"`.
5. **Push to your branch**: `git push origin feature-name`.
6. Create a **Pull Request**!

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📧 Contact

For any queries, contact: **vaibhavsinha812@gmail.com**
