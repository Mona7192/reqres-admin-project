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
├─ api/ # Axios instance and API setup
│ └─ reqres.ts
│
├─ contexts/ # Authentication context
│ └─ AuthContext.tsx
│
├─ pages/ # Application pages
│ └─ LoginPage.tsx
│
├─ components/ # Reusable UI components
│
├─ types.ts # TypeScript types
│
└─ index.css # Tailwind CSS imports