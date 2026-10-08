# 🏥 Healthcare Appointment System

A frontend-based **Healthcare Appointment System** for managing doctor discovery, patient registration, appointments, and appointment administration through a clean web interface.

Built as an academic **SDC project** using only **HTML, CSS, and JavaScript**, with **Browser Local Storage** used as the client-side data store.

## ✨ Project Highlights

- 👤 Patient/User registration and login
- 👨‍⚕️ Doctor listing and doctor-side appointment handling
- 🛠️ Admin dashboard and management workflows
- 📅 Appointment booking and status management
- 💾 Local Storage persistence — no external database required
- 📱 Responsive interface using CSS Grid and Flexbox
- 🔀 JavaScript-based navigation between modules
- 🔐 Role-aware login flow for the application
- 🧩 Modular folder structure for easier maintenance

## 🎯 Objective

The system is designed to simplify the basic appointment workflow:

**Patient → Select Doctor → Book Appointment → Doctor/Admin Reviews → Appointment Status**

It demonstrates how a multi-role business application can be implemented with standard frontend technologies and browser storage.

## 👥 Application Roles

| Role | Main Responsibilities |
|---|---|
| **User / Patient** | Register, log in, browse doctors, book appointments, view appointment information |
| **Doctor** | View appointments and confirm or reject appointment requests |
| **Admin** | Manage doctors, users, appointments, and overall application data |

> The project satisfies the SDC requirement for separate **Admin** and **User** modules while also providing a dedicated Doctor workflow.

## 🧰 Technologies Used

- **HTML5** — page structure and semantic markup
- **CSS3** — responsive UI, Flexbox and CSS Grid
- **JavaScript (ES6+)** — application logic, validation, navigation and interactions
- **Local Storage API** — client-side persistence
- **Git & GitHub** — version control and project hosting
- **VS Code** — development environment

## 📁 Project Structure

```text
Healthcare-Appointment-System/
│
├── admin/                  # Admin module
├── doctor/                 # Doctor module
├── user/                   # User/Patient module
├── css/                    # Shared stylesheets
├── js/                     # Shared JavaScript and storage logic
│
├── index.html              # Landing page
├── login.html              # Login page
├── signup.html             # Patient registration page
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

## 🔄 Main Application Flow

```text
                    ┌──────────────────┐
                    │   Landing Page   │
                    └────────┬─────────┘
                             │
                  ┌──────────┴──────────┐
                  │                     │
               Register               Login
                  │                     │
                  ▼                     ▼
             Create User         Authenticate User
                                        │
                          ┌─────────────┼─────────────┐
                          │             │             │
                          ▼             ▼             ▼
                       User          Doctor         Admin
                       Module        Module         Module
                          │             │             │
                          ▼             ▼             ▼
                       Book         Review /       Manage
                    Appointment      Update       Application
                          │        Appointments       │
                          └─────────────┬─────────────┘
                                        ▼
                               Local Storage Data
```

## 💾 Local Storage

The application uses the browser's **Local Storage API** instead of a server-side database.

This makes the project:

- Easy to run locally
- Suitable for frontend-only academic demonstrations
- Persistent across browser refreshes on the same browser/device
- Independent of an external database server

### Important

Local Storage is intended for this academic/demo implementation. It should **not** be treated as a secure production database for real medical or personal information.

## 🚀 How to Run

### Option 1 — VS Code Live Server

1. Clone or download the repository.
2. Open the project folder in **VS Code**.
3. Install/use the **Live Server** extension if available.
4. Open `index.html` with Live Server.
5. Use the navigation to register/login and test the application modules.

### Option 2 — Direct Browser

For basic frontend pages, `index.html` can also be opened directly in a modern browser. Live Server is recommended for a smoother development experience.

## 🧪 Demo Login

The application currently provides a demo admin account on the login page:

```text
Email:    admin@healthcare.com
Password: admin123
```

These credentials are intended only for local academic demonstration.

## 📌 SDC Requirements Covered

- [x] Problem-oriented business application
- [x] Admin module
- [x] User module
- [x] HTML, CSS and JavaScript implementation
- [x] CSS Grid / Flexbox based UI
- [x] Signup and Login functionality
- [x] Local Storage based data persistence
- [x] JavaScript navigation/redirection
- [x] Functional application modules
- [x] GitHub repository for project submission

## 🔒 Scope & Limitations

This is an **educational frontend project**, not a production healthcare platform.

It does not provide:

- Real medical records management
- Server-side authentication
- Encrypted patient data storage
- Real hospital/doctor verification
- Online payments
- Real-time notifications
- Production-grade security or compliance

For a production system, these would require a secure backend, database, authentication system, encryption, access controls, auditing, and appropriate healthcare/privacy compliance.

## 🌱 Possible Future Enhancements

- REST API and secure backend
- MySQL/PostgreSQL database
- JWT/session-based authentication
- Email/SMS appointment notifications
- Doctor availability calendar
- Online consultation support
- Prescription management
- Payment integration
- Appointment analytics
- Deployment to a cloud platform

## 👨‍💻 Author

**Shaik Ayaz Dadavali**  
GitHub: [@Ayaz-31778](https://github.com/Ayaz-31778)  
Email: [ayazdadavali1@gmail.com](mailto:ayazdadavali1@gmail.com)

## 📄 Academic Project

Developed as part of the **Software Development / SDC project work** at **KL University**.

---

⭐ If you find this project useful, consider starring the repository.
