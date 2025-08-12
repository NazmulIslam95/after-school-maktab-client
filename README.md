# After School Maqtab – Project Overview

## 📌 Project Name
**After School Maqtab**

## 🎯 Goal
A web-based platform for managing and running an educational program with a custom admin panel and tailored features for students and teachers.

---

## 📂 Core Features

### 1. **Frontend**
- **Home Page**:
  - Navbar above banner image with:
    - Sunrise/sunset info
    - Social icons
    - Hotline number
  - Sections for featured content, testimonials, contact, etc.
- **Course Details Page**:
  - Uses the **previous detailed and styled layout** (preferred over simplified version).
- **Payment Page**:
  - Includes a **calendar scheduling feature** for 1-to-1 monthly courses.
  - Students can:
    - Select the month
    - Choose specific days per week (e.g., 4 days/week → 16 days/month)
    - Store selected dates on the server linked to their purchase history.

---

### 2. **Dashboard**
- **Admin Panel**:
  - Left-side navigation bar with:
    - Admin image & name at top
    - Items: Courses, Students, Payments, Calendar, Summary, etc.
  - Drawer-style nav for mobile
  - Fixed left navbar for desktop
- **User Dashboard**:
  - Shows enrolled courses, schedule, and profile info.

---

### 3. **Course Management**
- Ability to:
  - Add new courses
  - Edit existing courses (logic + API handling in a single component)
  - Assign courses to students
  - View assigned courses for tutors

---

## ⚙️ Tech Stack
- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB (Native Driver, not Mongoose)
- **Auth**: JWT (Custom Express `/jwt` endpoint, `verifyToken` middleware)
- **Hosting**:
  - Frontend: Vercel
  - Backend: Firebase Hosting (possible), Cloudflare DNS
- **Analytics**: Firebase Analytics (UI not customized)

---

## 🗓 Calendar Scheduling Logic
- Students can:
  - Choose **month**
  - Select **preferred days** of the week
- Server stores:
  - Selected dates
  - Linked to the course purchase history
