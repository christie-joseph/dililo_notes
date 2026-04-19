# Backend Requirements & Implementation Plan

This document outlines the architectural requirements for migrating the DiLiLo web app from a mock local state to a live backend (Firebase or Supabase).

## 1. Core Services Required

*   **Database:** A NoSQL (Cloud Firestore) or relational database (PostgreSQL via Supabase) to persist the digital notes.
*   **Storage Bucket:** A BLOB storage mechanism (Firebase Storage or Supabase Storage) to handle the planned "single image attachment" per note.
*   **Authentication:** 
    *   **Admin Role:** A secured login specifically for the "dililo" user to access the Home, Search, and Favorites dashboard securely. 
    *   **Guest Role:** Anonymous/Open access for visitors to submit notes.

---

## 2. Data Schema: `notes` Table/Collection

Each note should map to the following schema:

| Field Name | Data Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` / `string` | **Yes** | Unique identifier for the note. |
| `author` | `string` | **Yes** | Name submitted by the guest writer. |
| `text` | `string` (text) | **Yes** | The core body / message of the note. |
| `group` | `enum` | **Yes** | Relationship type: `Family`, `Friend`, `Colleague`, or `Other`. |
| `toPerson` | `enum` | **Yes** | Recipient string: `Divi`, `Liya`, or `Milo (Meow)`. |
| `isFav` | `boolean` | **Yes** | Tracks if the `dililo` admin has favorited this note. Defaults to `false`. |
| `createdAt` | `timestamp` | **Yes** | The datetime the note was submitted. Auto-generated. |
| `imageUrl` | `string` (url) | No | A public CDN URL mapping to the attached image in the Storage Bucket. |

---

## 3. Storage Structure

To support the future "single image with note" feature:
*   **Bucket Strategy:** A single central bucket (e.g., `gs://dililo-app.appspot.com/keepsakes/`).
*   **File Naming:** Images should be uploaded with a UUID mapping back to the note `id` or using random secure hashing to prevent filename collisions (e.g., `keepsakes/{uuid}.jpg`).

---

## 4. Security & Access Control (RLS / Firebase Rules)

The system relies heavily on explicit asymmetric read/write permissions based on the active role.

### Guest (Unauthenticated Visitor)
*   **Database (`notes`):** `CREATE` only. Visitors **cannot** read existing notes or modify/delete them. 
*   **Storage:** `CREATE` only. Visitors can upload an image but cannot list or overwrite bucket contents.

### Admin (`dililo` Account)
*   **Database (`notes`):** Full `CRUD` array (`CREATE`, `READ`, `UPDATE`, `DELETE`). Required to list notes on the Dashboard/Archive, toggle `isFav` boolean states, and delete rogue submissions.
*   **Storage:** Full `READ` access to pull images down to the interface, and `DELETE` access to clean up deleted notes.

---

## 5. Next Steps for Integration

1.  **Initialize Project:** Create a Firebase or Supabase project instance.
2.  **Environment Variables:** Add keys (e.g., `VITE_FIREBASE_API_KEY`) to a local `.env.local`.
3.  **SDK Setup:** Install `@supabase/supabase-js` or `firebase` npm packages.
4.  **Refactor AppContext:** Swap out the dummy `useState` arrays in `src/context/AppContext.tsx` with asynchronous `useEffect` hooks fetching and binding the database streams natively.
5.  **Form Enhancement:** Add a standard `<input type="file" />` mechanism to the `Write.tsx` page to execute the image upload sequence prior to database commit.
