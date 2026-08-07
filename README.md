# StudentHub — College Student Portal

A semester-long web development project for **Web Development Framework (HTML, CSS, JavaScript, PHP, MySQL)** — B.Tech CSE, 3rd Semester.

## 1. Problem definition

StudentHub is a college portal where:
- **Visitors** can browse public information — courses offered, upcoming events, downloadable resources, and student achievements.
- **Students** can register, log in, and access a personal dashboard.
- **Admins** can manage students, events, and site content through a role-restricted dashboard.

## 2. User roles

| Role     | Access |
|----------|--------|
| Visitor  | Home, About, Events, Resources, Contact |
| Student  | All visitor pages + Register/Login + Student Dashboard |
| Admin    | Admin Dashboard (student & event management, CRUD) |

## 3. Pages (10 total)

1. `index.html` — Home
2. `about.html` — About the portal / college
3. `register.html` — Student registration
4. `login.html` — Student login
5. `dashboard.html` — Student dashboard (session-protected)
6. `courses.html` — Course/academic info
7. `events.html` — College events listing
8. `resources.html` — Downloadable study material
9. `contact.html` — Contact form
10. `admin/dashboard.html` — Admin panel (CRUD, RBAC)

## 4. Navigation flow

Home → About / Events / Resources / Contact (public nav)
Home → Login/Register → Student Dashboard → Courses / Events / Resources
Admin logs in separately → Admin Dashboard

## 5. Folder structure

```
StudentHub/
├── index.html
├── about.html
├── register.html
├── login.html
├── dashboard.html
├── courses.html
├── events.html
├── resources.html
├── contact.html
├── admin/
│   └── dashboard.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
├── docs/
│   ├── sitemap.png
│   └── wireframes/
│       ├── wireframe-home.png
│       ├── wireframe-about.png
│       ├── wireframe-register.png
│       ├── wireframe-login.png
│       ├── wireframe-dashboard.png
│       ├── wireframe-courses.png
│       ├── wireframe-events.png
│       ├── wireframe-resources.png
│       ├── wireframe-contact.png
│       └── wireframe-admin-dashboard.png
├── README.md
└── .gitignore
```

## 6. Tools & technology

- VS Code
- Figma / draw.io (wireframes, sitemap)
- Git & GitHub (version control)
- (Later phases) PHP, MySQL

## 7. Learning outcome (Practical 1)

Analyze project requirements and prepare a structured foundation — sitemap, wireframe, folder structure, and repository setup — before writing any code.

## 8. How to run

This is a static HTML/CSS/JS project for Phase 1 — just open `index.html` in a browser. No server required until Phase 3 (PHP/MySQL).

## 9. Author

Het Patel, 25DCS082 — B.Tech CSE, 3rd Semester