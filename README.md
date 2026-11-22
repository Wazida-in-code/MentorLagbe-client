# 🎓 MentorLagbe — Find Tutors, Shape Your Future

**MentorLagbe** is a modern online tutoring platform designed to connect students with qualified tutors. It makes finding tuition, applying for teaching opportunities, managing applications, and handling payments easier through a single platform.

Whether you're a student looking for the right tutor or a tutor searching for teaching opportunities, MentorLagbe brings both sides together.

---

## 🌐 Live Project

**Live Website:** [Add Your Live URL Here](https://mentorlagbe-omega.vercel.app/)

---

## 🔐 Admin Credentials

Use the following credentials to explore the admin dashboard:

- **Email:** `ADD_ADMIN_EMAIL`
- **Password:** `ADD_ADMIN_PASSWORD`

---

## ✨ Key Features

### 👨‍🎓 For Students
- Browse and explore available tuition opportunities.
- Search and filter tuitions based on preferences.
- Apply for tuition with preferred schedules and personal notes.
- Track application status and progress.
- Make secure payments through Stripe Checkout.
- View transaction history.
- Update personal profile information.

### 👨‍🏫 For Tutors
- Create and publish tuition posts.
- Edit, activate, or close tuition posts.
- Review and manage student applications.
- Track tuition statistics through a personalized dashboard.
- Manage profile information.

### 🛡️ For Administrators
- Monitor platform activities through an admin dashboard.
- View and manage registered users.
- Review and approve or reject tuition posts.
- Monitor platform transactions.
- View important platform statistics.

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

### Authentication & Payment
- Better Auth
- Stripe

---

## 📦 NPM Packages

Some of the main packages used in this project:

| Package | Purpose |
|---|---|
| `next` | React framework |
| `react` | UI development |
| `typescript` | Type safety |
| `tailwindcss` | Styling |
| `better-auth` | Authentication |
| `mongodb` | Database integration |
| `stripe` | Payment processing |
| `sonner` | Toast notifications |
| `lucide-react` | Icons |
| `react-icons` | Additional icons |
| `swiper` | Responsive sliders |
| `motion` | Animations |
| `recharts` | Dashboard charts |

*Update this list to match the packages actually installed in your project.*

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
│   └── index.js
│
└── README.md
```

*Adjust the structure according to your actual repository.*

---

## 🎯 Project Purpose

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

A full-stack learning project focused on building a practical tutoring platform using modern web technologies.

---

⭐ If you find MentorLagbe interesting, consider giving the repository a star!

**MentorLagbe — Connecting Knowledge with Opportunity.**