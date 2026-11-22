# 🎓 MentorLagbe — Find Tutors, Shape Your Future

**MentorLagbe** is a modern online tutoring platform designed to connect students with qualified tutors. It makes finding tuition, applying for teaching opportunities, managing applications, and handling payments easier through a single platform.

Whether you're a student looking for the right tutor or a tutor searching for teaching opportunities, MentorLagbe brings both sides together.

---

## ✨ Key Features

### 👨‍🎓 For Students
- **Browse Tuitions:** Explore available tuition opportunities.
- **Search & Discover:** Find suitable tuitions based on your preferences.
- **Apply for Tuition:** Submit applications with preferred schedules and personal notes.
- **Track Applications:** Monitor application status and progress.
- **Secure Payments:** Complete payments through Stripe Checkout.
- **Transaction History:** Keep track of payment records.
- **Profile Management:** Update personal information.

### 👨‍🏫 For Tutors
- **Create Tuition Posts:** Publish tuition opportunities with relevant details.
- **Manage Tuitions:** Edit, activate, or close your tuition posts.
- **Application Management:** Review student applications and manage their status.
- **Dashboard Overview:** Monitor tuition statistics and activities.
- **Payment Tracking:** Keep track of relevant payment information.
- **Profile Management:** Manage tutor profile information.

### 🛡️ For Administrators
- **Admin Dashboard:** Get an overview of platform activities.
- **User Management:** View and manage platform users.
- **Tuition Management:** Review and manage tuition posts.
- **Tuition Approval:** Approve or reject submitted tuition posts.
- **Transaction Overview:** Monitor platform transactions.
- **Platform Statistics:** View important platform metrics.

---

## 🛠️ Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn/UI
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB

### Authentication & Payments
- Better Auth
- Stripe

### Development Tools
- Git & GitHub
- Vercel
- Postman

---

## 🚀 Getting Started

Follow these instructions to run MentorLagbe locally.

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd MentorLagbe
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in your frontend project and configure the required environment variables.

```env
NEXT_PUBLIC_BASE_SERVER_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

Configure the corresponding MongoDB, authentication, and Stripe environment variables in your backend as well.

**Note:** Never expose secret keys or commit environment files to GitHub.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the application.

---

## 📁 Project Structure

```text
MentorLagbe/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   ├── types/
│   └── public/
│
├── backend/
│   ├── index.js
│   ├── routes/
│   ├── controllers/
│   └── config/
│
└── README.md
```

*The structure above is an illustrative overview; adjust folder names to match your actual repository.*

---

## 🔐 Security & Authentication

- Role-based access for Students, Tutors, and Admins.
- Protected routes and role-specific dashboards.
- Secure authentication using Better Auth.
- Stripe Checkout integration for payment processing.
- Server-side validation for important operations.

---

## 🎯 Project Goals

MentorLagbe aims to simplify the tutoring experience by:

- Connecting students with suitable tutors.
- Helping tutors discover teaching opportunities.
- Making tuition applications easier to manage.
- Providing transparent application and payment tracking.
- Creating a centralized platform for tutoring activities.

---

## 🌱 Future Improvements

- Real-time notifications.
- In-app messaging between students and tutors.
- Advanced tuition recommendation system.
- Tutor reviews and ratings.
- More advanced search and filtering.

---

## 👩‍💻 Developer

**Developed with ❤️ by Wazida**

A learning project focused on building a practical full-stack application using modern web technologies.

---

⭐ If you find MentorLagbe interesting, consider giving the repository a star!

**MentorLagbe — Connecting Knowledge with Opportunity.**