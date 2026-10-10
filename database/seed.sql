
USE studenthub;

INSERT INTO students
(fullname, email, mobile, idno, password_hash, course, study_year, gender)
VALUES
(
    'Aarav Shah',
    'aarav.shah@example.com',
    '9876543210',
    'STU1001',
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
    'cse', 2, 'male'
),
(
    'Diya Patel',
    'diya.patel@example.com',
    '9876543211',
    'STU1002',
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
    'it', 2, 'female'
),
(
    'Krish Desai',
    'krish.desai@example.com',
    '9876543212',
    'STU1003',
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
    'ce', 3, 'male'
);

INSERT INTO events
(id, title, event_date, category, description)
VALUES
(1, 'Tech Fest 2026', '2026-09-05', 'technical',
 'Annual technical festival with hackathons, coding contests, and project exhibitions.'),
(2, 'Freshers'' Welcome Party', '2026-08-20', 'cultural',
 'A fun evening of music, games, and introductions for new students.'),
(3, 'Inter-College Cricket Cup', '2026-09-12', 'sports',
 'Annual cricket tournament between CSE, IT, and CE departments.'),
(4, 'AI & Machine Learning Workshop', '2026-09-18', 'workshop',
 'Hands-on workshop covering the basics of Python, ML models, and real datasets.'),
(5, 'Guest Lecture: Careers in Cloud Computing', '2026-09-22', 'seminar',
 'Industry expert talk on career paths in AWS, Azure, and GCP.'),
(6, 'Code Sprint 24hr Hackathon', '2026-10-03', 'technical',
 'A 24-hour team hackathon to build and pitch a working prototype.'),
(7, 'Annual Cultural Night', '2026-10-10', 'cultural',
 'Dance, music, and drama performances by students across all years.'),
(8, 'Badminton Championship', '2026-10-15', 'sports',
 'Singles and doubles badminton matches open to all students.'),
(9, 'Git & GitHub Workshop', '2026-10-20', 'workshop',
 'Learn version control basics, branching, and collaborative workflows.'),
(10, 'Resume & Interview Prep Seminar', '2026-10-25', 'seminar',
 'Tips from alumni and placement cell on resumes and interview rounds.'),
(11, 'Web Development Bootcamp', '2026-11-02', 'workshop',
 'Two-day intensive session on HTML, CSS, JavaScript, and deployment.'),
(12, 'Robotics Expo', '2026-11-08', 'technical',
 'Showcase of student-built robots and automation projects.'),
(13, 'Football Tournament', '2026-11-14', 'sports',
 'Knockout-format football tournament across all departments.'),
(14, 'Diwali Celebration', '2026-11-20', 'cultural',
 'Campus-wide Diwali celebration with rangoli and lighting competitions.'),
(15, 'Alumni Connect Meetup', '2026-11-28', 'seminar',
 'Networking session with graduated alumni working across the industry.');

INSERT INTO registrations (student_id, event_id)
VALUES
(1, 6),
(2, 9),
(3, 12);
