# Healthcare Appointment System

A frontend-based **Healthcare Appointment System** developed as an SDC academic project using only **HTML, CSS, and JavaScript**. The application provides separate **User** and **Admin** modules, with browser **Local Storage** used as the only database.

## Project Overview

The system is designed to simplify doctor discovery and appointment booking for patients while providing administrators with tools to manage doctors, users, and appointments.

### Problem Statement

Patients may need a simple way to find doctors, view their specialization and availability, and book appointments. Administrators also need a centralized interface to manage doctor information, registered users, and appointment status.

This project addresses these requirements through a responsive frontend application with Local Storage-based data management.

## Modules

### 1. User Module

- User registration and login
- Doctor search
- Doctor filtering by specialization
- Doctor details
- Appointment booking
- Appointment history
- Appointment cancellation
- User profile
- Logout

### 2. Admin Module

- Admin login
- Dashboard statistics
- Add doctors
- Edit doctor information
- Delete doctors
- View registered users
- View all appointments
- Update appointment status
- Logout

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and forms |
| CSS3 | Styling, responsive design, CSS Grid and Flexbox |
| JavaScript | Application logic, validation, navigation and data handling |
| Local Storage | Database and session storage |
| VS Code | Development environment |
| Git & GitHub | Version control and project hosting |
| Live Server | Local development and testing |

## Database

This project uses **browser Local Storage only**. No external database or backend server is required.

The application stores:

- health_users — registered users and admin account
- health_doctors — doctor information
- health_appointments — appointment records
- health_current_user — current login session

## Authentication

### Admin Demo Account

- **Email:** admin@healthcare.com
- **Password:** admin123

Normal users can create an account through the Signup page.

> **Security note:** This is an academic frontend project. Passwords are stored in Local Storage for demonstration purposes and should not be stored this way in a production healthcare application.

## Main Application Flow

~~~text
USER FLOW

Home
  ↓
Signup / Login
  ↓
User Dashboard
  ↓
Search / Filter Doctors
  ↓
Select Doctor
  ↓
Book Appointment
  ↓
My Appointments
  ↓
View / Cancel Appointment
~~~

~~~text
ADMIN FLOW

Admin Login
    ↓
Admin Dashboard
    ↓
Manage Doctors
    ├── Add
    ├── Edit
    └── Delete
    ↓
View Users
    ↓
Manage Appointments
    ↓
Update Appointment Status
~~~

## Project Structure

~~~text
Healthcare-Appointment-System/
│
├── admin/
│   ├── dashboard.html
│   ├── doctors.html
│   ├── users.html
│   └── appointments.html
│
├── user/
│   ├── dashboard.html
│   ├── appointments.html
│   └── profile.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── storage.js
│   ├── auth.js
│   ├── doctors.js
│   ├── appointments.js
│   └── admin.js
│
├── index.html
├── login.html
├── signup.html
└── README.md
~~~

## UI Design

The interface uses:

- CSS Grid for responsive layouts
- Flexbox for navigation and component alignment
- Responsive design for different screen sizes
- Forms for user input and appointment booking
- Tables for administrator data management
- Cards for doctor and appointment information

## How to Run in VS Code

### 1. Clone the repository

~~~bash
git clone https://github.com/Ayaz-31778/Healthcare-Appointment-System.git
~~~

### 2. Open the project

Open the cloned folder in **Visual Studio Code**.

### 3. Install Live Server

Install the **Live Server** extension in VS Code.

### 4. Start the application

Open index.html.

Right-click the file and select **Open with Live Server**.

The application will open in your browser.

## SDC Requirement Checklist

- [x] Problem statement identified
- [x] Business system identified
- [x] Admin Module implemented
- [x] User Module implemented
- [x] HTML used
- [x] CSS used
- [x] JavaScript used
- [x] CSS Grid / Flexbox used
- [x] Signup functionality
- [x] Login functionality
- [x] Local Storage database
- [x] JavaScript module-wise navigation
- [x] Doctor management
- [x] Appointment management
- [x] User management
- [x] GitHub repository

## Future Enhancements

- Secure backend authentication
- Encrypted password storage
- Real database integration
- Doctor availability calendars
- Email/SMS notifications
- Online payment integration
- Medical record management
- Role-based access control
- Appointment reminders
- Deployment to a web server

## Author

**Shaik Ayaz Dadavali**

B.Tech - Computer Science and Engineering

KL University

## Repository

**Healthcare Appointment System**

Maintained on GitHub under the repository owner **Ayaz-31778**.
