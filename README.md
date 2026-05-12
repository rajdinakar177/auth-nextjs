# Auth Next.js 🔐

A secure authentication system built using Next.js, TypeScript, MongoDB, JWT, and bcrypt.

## Features

- User Signup & Login
- JWT Authentication
- Forgot Password Functionality
- Password Reset via Secure Token
- Secure Logout System
- Password Hashing with bcryptjs
- MongoDB Database Integration
- Protected Routes
- Environment Variable Support
- API Routes using Next.js App Router
- Responsive UI

---

## Tech Stack

- Next.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Nodemailer

---

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/rajdinakar177/auth-nextjs.git
```

Move into the project folder:

```bash
cd auth-nextjs
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 with your browser to see the result.

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
MONGO_URL=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret
DOMAIN=http://localhost:3000
ADMIN_EMAIL = ''
NODE_MAILER_USER=your_mailtrap_username
NODE_MAILER_PASS=your_mailtrap_password
```

> Note:
> `.env` is ignored using `.gitignore` for security reasons and is not pushed to GitHub.

---

## Folder Structure

```bash
app/
 ├── api/users
 ├── login/
 ├── signup/
 ├── profile/
 ├── forgotpassword/
 ├── resetpassword/
```

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- Next.js Documentation — https://nextjs.org/docs
- Learn Next.js — https://nextjs.org/learn

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is using Vercel:

https://vercel.com

---

## Author

Dinakar raju