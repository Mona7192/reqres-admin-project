# Reqres Admin Test Project

This is a **Frontend Admin Web App** built with **React**, **TypeScript**, and **Tailwind CSS**.  
The app allows an admin to **login, view a list of users, see user details, and manage users**.  

This project is created as a **frontend test for interview purposes**.

---

## Features

- Admin login with test credentials
- Token stored in **LocalStorage** and used for authenticated requests
- View list of users (`/api/users?page=?`)
- View details of individual users
- Logout functionality
- Styled with **Tailwind CSS**
- Built entirely with **TypeScript**

---

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Axios
- React Router v6
- Vite

---

## Folder Structure

src/
│
├─ api/              # Axios instance and API setup
│   └─ reqres.ts
│
├─ contexts/         # Authentication context
│   └─ AuthContext.tsx
│
├─ pages/            # Application pages
│   ├─ LoginPage.tsx
│   ├─ UsersPage.tsx
│   └─ UserDetailPage.tsx
│
├─ components/       # Reusable UI components
│   ├─ UserCard.tsx
│   ├─ UserForm.tsx
│   ├─ Navbar.tsx
│   └─ PrivateRoute.tsx
│
├─ types.ts          # TypeScript types
│
└─ index.css         # Tailwind CSS imports



## API Limitations
The free tier of Reqres API (with `x-api-key: reqres-free-v1`) has the following limitations:
- `POST /users` creates a user with an `id` and `createdAt`, but data is not persistent and stored locally.
- `PUT /users/{id}` and `DELETE /users/{id}` are not supported.
- User details for locally created users (IDs > 12) are retrieved from localStorage, while IDs 1-12 are fetched from paginated lists.


## Installation

```bash
# Clone the repository
git clone https://github.com/Mona7192/reqres-admin-project

# Navigate into the project folder
cd reqres-admin-test

# Install dependencies
npm install

# Run the development server
npm run dev
