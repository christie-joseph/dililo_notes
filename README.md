# DiLiLo - Digital Guestbook Notes

Welcome to the DiLiLo application! This is a beautifully themed, mobile-first centralized note-taking app designed primarily to function as a digital guestbook. It allows friends and family to easily send notes, which are aggregated for the couple to read and cherish.

## 🔒 Guest Mode vs Admin Mode (Important!)

This application uses a strict sandbox environment to ensure privacy. 

**For Guests (Default Mode):**
Whenever anyone visits the base URL (e.g., `dililonotes.vercel.app`), they are automatically locked into **Guest Mode**. 
- They can only access the **Write** page (`/write`).
- They can author notes, select who they are from, and submit them using the "Seal & Send" animation.
- Upon submission, they are routed to a **Thank You** page, with no navigation linking them to anywhere else. 
- *Guests have absolutely no way to read other people's notes or access the main application features.*

**For the Couple (Admin/Reader Mode):**
To read the notes, manage favorites, and search through submissions, you must unlock **Reader Mode**.
1. Navigate to the hidden admin path by appending `/admin` to your URL (e.g., `dililonotes.vercel.app/admin`).
2. Click **"Unlock Reader"**. 
3. Your browser will instantly memorize this authorization via LocalStorage.
4. From then on, visiting the website will grant you full access to the Home, Favorites, and Search pages along with the bottom navigation bar.

*If you ever need to lock your device back down to guest-only access, visit `/admin` again and select "Lock to Writer".*

## 🚀 Running the Project

### Locally
1. Ensure you have Node.js installed.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the Vite development server.
4. Your application will be live at `http://localhost:5173`.

### Deployment
This project is configured out-of-the-box for **Vercel**. It includes a `vercel.json` file which configures strict routing rules, explicitly ensuring all URL paths (like `/write` or `/favs`) successfully redirect cleanly through React Router without triggering 404 errors.

---

### Tech Stack
- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** Custom CSS (Glassmorphism, High-end CSS Variables, Micro-animations)
- **Icons:** Lucide React
- **Routing:** React Router DOM
