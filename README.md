# Real-time Chat Application 💬

A full-stack real-time chat application developed as a test assignment for Sibers. The app supports real-time messaging, user profiles, persistent history, and admin moderation features.

## 🚀 Features implemented

* **Real-time Messaging:** Powered by Socket.io for instant communication.
* **Persistent History:** All messages and users are stored in MongoDB (Atlas).
* **User Profiles:** Detailed portfolio view (Email, Phone, Company) pulled from the database.
* **Room Management:** Join existing active rooms or create new ones.
* **Admin Moderation:** The creator of the room (first user) gets `Admin` status and can **kick** other users.
* **Search:** Filter active users in the sidebar.
* **UI/UX:** Responsive Material UI design with Emoji support.

## 🛠 Tech Stack

* **Frontend:** React.js, Material UI (MUI), Emoji Picker React.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB Atlas (Cloud).
* **WebSocket:** Socket.io.

## 📦 Installation & Setup Guide

Follow these steps to run the project locally.

### Prerequisites
* Node.js installed.
* Git installed.

### 1. Clone the repository
```bash
git clone <https://github.com/tansan999/real-chat-test1.git>
cd real-chat-test
````

### 2\. Backend Setup (Server)

The server handles the database connection and socket events.

1.  Navigate to the server directory:

    ```bash
    cd server
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  **Important:** Populate the database with test users (Portfolio data):

    ```bash
    node seed.js
    ```

    *(You should see: "✅ Successfully imported 15 users\!")*

4.  Start the server:

    ```bash
    npm start
    ```

    *The server will run on `http://localhost:5000`*

### 3\. Frontend Setup (Client)

Open a **new terminal** window for the client.

1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the React app:
    ```bash
    npm start
    ```
    *The app will open at `http://localhost:3000`*

## 🧪 How to Test

1.  Open the app in your browser.
2.  **Login:** Enter the username **`Kudaibergen`** (or `Anna Conroy`) to see the full profile data.
      * *Note: Use the exact usernames from the database to load profile info.*
3.  **Room:** Enter any room name (e.g., `General`).
4.  **Admin Test:** Open the app in a second browser window (Incognito mode), login as a different user, and join the same room.
      * The first user will see a **Crown 👑** icon.
      * The Admin can hover over the second user in the sidebar and click **✕** to kick them.

## 👤 Author

**Kudaibergen**

  * Fullstack Developer Candidate

<!-- end list -->

````
