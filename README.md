# 📝 Noto

**Noto** is a full-stack note-taking web application built using the **MERN stack**. It provides users with a simple and secure platform to create, manage, and organize their notes.

The project was built to explore real-world full-stack development concepts including authentication, REST APIs, database management, file uploads, email services, and frontend-backend integration.

---

## 🚀 Features

* 🔐 User authentication and registration
* 🔑 Secure password handling
* 📧 Email-based functionality
* 🔵 Google OAuth authentication
* 📝 Create notes
* ✏️ Edit notes
* 🗑️ Delete notes
* 📌 Manage and organize personal notes
* ☁️ Cloud-based image/file handling
* 🔒 Protected routes
* 🛡️ Backend validation and authentication
* 🌐 RESTful API architecture
* 📱 Responsive user interface

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* JavaScript
* HTML5
* CSS3
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* REST APIs

### Services & Tools

* Google OAuth
* Cloudinary
* Nodemailer
* Git & GitHub

---

## 📂 Project Structure

```text
Noto/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── package.json
│   └── ...
│
├── .gitignore
├── README.md
```

> The exact folder structure may change as the project evolves.

---

# ⚙️ Installation & Setup

## 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/noto.git
```

Move into the project directory:

```bash
cd noto
```

---

## 2. Install frontend dependencies

```bash
cd frontend
npm install
```

---

## 3. Install backend dependencies

Open another terminal or return to the project root:

```bash
cd ../backend
npm install
```

---

# 🔐 Environment Variables

The application uses environment variables for sensitive information such as database credentials, authentication secrets, email credentials, and third-party services.

Create a `.env` file inside the appropriate backend directory.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
```

### ⚠️ Important

**Never commit your `.env` file to GitHub.**

Your `.gitignore` should contain:

```gitignore
.env
.env.*
!.env.example
```

You can optionally create an `.env.example` file containing the required variable names without any real credentials.

---

# ▶️ Running the Application

## Start the Backend

Navigate to the backend:

```bash
cd backend
```

Run the development server:

```bash
npm run dev
```

If your backend does not use Nodemon, use:

```bash
npm start
```

---

## Start the Frontend

Open another terminal:

```bash
cd frontend
```

Run:

```bash
npm run dev
```

The frontend will usually be available at:

```text
http://localhost:5173
```

The backend will usually run on:

```text
http://localhost:5000
```

> The actual ports may differ depending on your configuration.

---

# 🔑 Authentication

Noto uses authentication to protect user accounts and private data.

The application supports authentication mechanisms such as:

* User registration
* User login
* Password-based authentication
* JWT-based authentication
* Google OAuth
* Protected API routes

Authentication-related credentials and secrets are stored using environment variables.

---

# 🗄️ Database

Noto uses **MongoDB** as its database and **Mongoose** as the ODM.

The database stores application data such as:

* User accounts
* Notes
* Authentication-related information
* Other application-specific data

The MongoDB connection string is provided through the `MONGO_URI` environment variable.

---

# ☁️ Cloudinary

Noto can use **Cloudinary** for cloud-based media storage and management.

Cloudinary credentials should be stored in the backend `.env` file:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Never expose these credentials publicly.

---

# 📧 Email Service

Email functionality is handled using **Nodemailer**.

Email credentials should be configured through environment variables rather than being directly written into the source code.

---

# 🔵 Google OAuth

Noto supports Google authentication using OAuth credentials.

You need to configure a Google OAuth application and provide the required credentials through environment variables.

Make sure your configured redirect URLs match the URLs used by your local and production environments.

---

# 🔒 Security

The project follows several security practices, including:

* Environment variables for secrets
* Protected backend routes
* Authentication middleware
* Password protection
* Server-side validation
* Separation of frontend and backend
* Secure handling of API credentials

Never expose:

```text
.env
JWT secrets
MongoDB credentials
Google OAuth secrets
Cloudinary API secrets
Email passwords
```

in the public repository.

---

# 🧪 Development

To contribute or experiment with the project:

1. Fork the repository.
2. Clone your fork.
3. Create a new branch.

```bash
git checkout -b feature/your-feature
```

4. Make your changes.
5. Test the application.
6. Commit your changes.

```bash
git add .
git commit -m "Add your feature"
```

7. Push your branch.

```bash
git push origin feature/your-feature
```

8. Open a Pull Request.

---

# 🗺️ Future Improvements

Some potential improvements for Noto include:

* [ ] Dark mode
* [ ] Note categories
* [ ] Tags
* [ ] Search functionality
* [ ] Note sorting and filtering
* [ ] Rich text editor
* [ ] Note sharing
* [ ] Real-time collaboration
* [ ] Improved mobile experience
* [ ] Automated testing
* [ ] Rate limiting
* [ ] Production deployment
* [ ] Improved authorization and role management

---

# 📸 Screenshots

Screenshots of the application can be added here.

Example:

```text
Add screenshots/GIFs of the application here.
```

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

If you find a bug or have an idea for a feature, feel free to open an issue or submit a pull request.

---

# 📄 License

This project is currently available for educational and personal development purposes.

A formal open-source license can be added later if required.

---

# 👨‍💻 Author

**Diganta Swar**

Built with ❤️ using the MERN stack.

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.
