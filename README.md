# Blog App - Frontend

This is the frontend for the blog app.
It is built with Next.js and styled with Tailwind CSS.

---

## What it does

- Lets users register and log in
- Saves the token in localStorage after login
- Shows a different dashboard based on the user role
- Lets users create, edit and delete their own posts
- Lets users add and delete their own comments
- Protects pages so only the right role can access them

---

## How to Run

Go into the frontend folder:

```bash
cd frontend
```

Install the packages:

```bash
npm install
```

Start the app:

```bash
npm run dev
```

It will run on http://localhost:3000

Make sure the backend is running on http://localhost:5000 before using the app.

---

## Folder Structure

frontend/
src/
app/ → all the pages
components/ → reusable UI pieces
context/ → global auth state
hooks/ → reusable logic
services/ → all API calls

---

## Pages

- /login → login page
- /register → register page
- /dashboard/user → dashboard for normal users
- /dashboard/admin → dashboard for admins

---

## Components

- PostCard → shows a single post with edit and delete buttons
- PostForm → form for creating and editing posts
- CommentSection → shows comments and lets users add or delete them
- Pagination → handles moving between pages of posts
- ProtectedRoute → blocks pages from users who are not logged in or wrong role

---

## Hooks

- useLogin → handles the login process
- useRegister → handles the register process
- usePosts → fetches posts and handles create, update, delete
- useComments → handles adding and deleting comments

---

## How auth state is managed

After login, the token and user info are saved in localStorage.
The AuthContext reads this on page load and makes it available everywhere in the app.
When the user logs out, everything is cleared from localStorage and state.

---

## How pages are protected

Every dashboard page is wrapped in a ProtectedRoute component.
If the user is not logged in, they get sent to the login page.
If they are logged in but have the wrong role, they get sent to their correct dashboard.

---

## Tech Stack

- Next.js
- Tailwind CSS
- Axios
- Context API
