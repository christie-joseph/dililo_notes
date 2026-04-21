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

### Deployment
This project is configured out-of-the-box for **Vercel**. It includes a `vercel.json` file which configures strict routing rules, explicitly ensuring all URL paths (like `/write` or `/favs`) successfully redirect cleanly through React Router without triggering 404 errors.

---

### Tech Stack
- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** Custom CSS (Glassmorphism, High-end CSS Variables, Micro-animations)
- **Icons:** Lucide React
- **Routing:** React Router DOM

---

## 🚧 Pending Requirements / Roadmap

To evolve this from a static frontend interface into a fully fledged, production-ready application, the following backend/infrastructure requirements are pending:

1. **Cloud Database (Free Tier):**
   - Currently, notes are stored transiently in React's local state and will be lost on page reload.
   - **Requirement:** Integrate a free-tier NoSQL database (like **Firebase Firestore** or **Supabase**) to permanently store, fetch, and persist guest notes to the cloud.

2. **Admin Authentication Gateway:**
   - **Requirement:** Add a fun, basic login gateway to the `/admin` page.
   - **Implementation:** The username will physically auto-populate as `dililo` with a required secret password (`milosnipsnip`) to unlock the read-mode. Since this is a simple, shared-secret access gate for the couple, this password can simply be hardcoded as an underlying Environment Variable (e.g., in Vercel) rather than requiring complex Firebase Auth user tables.
