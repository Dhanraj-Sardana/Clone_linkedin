# LinkedIn Clone
A simple web application inspired by LinkedIn where users can sign up, log in, create text posts, and view posts created by all other users.

##  How to Run the Project
```
git clone <your-repo-link>
```
### Backend
```
cd backend
npm install
```
### Create a .env file inside backend/
-GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
-GOOGLE_CLIENT_SECRET=<YOUR_GOOGLE_CLIENT_SECRET>
-PORT=<YOUR_PORT_NUMBER>
-MONGO_URI=<YOUR_MONGODB_CONNECTION_URL>
-KEY=<YOUR_SESSION_SECRET>
-NODE_ENV=<development_or_production>


### Start Backend Server
```
npm start
```

### Frontend
```
cd frontend
npm install
npm run dev
```
## Features 

### 1. User Signup & Login
- Users can register with username, email, and password.  
- After registration they can log in to access the app.
- login can be mannual or by continue with google.  
- Logged-in user’s name is displayed on the navbar/top bar.  
- Sessions stored for google Auth.
- Cookie stored with email and username using jwt token
  
### 2. Create Post
-Users can create text‑based posts after logging in.
-Each post includes:
      -User’s name (fetched using req.user via session authentication)
      -Post text
      -Timestamp (createdAt)

-How it works:
  -The frontend sends a POST request to /posts/create using fetch() with credentials: "include".
  -The backend verifies req.user and stores the post in MongoDB.
  -After creation, posts are automatically refreshed on the UI.

### 3. View All Posts
-All registered users can see posts created by every other user.
-Posts are displayed in reverse chronological order (latest first).
-Each post shows:
    -User’s name
    -Content
    -Formatted time
-Backend uses .populate("user") to fetch author's details.

## Tech
### Frontend
-React.js (Vite)
-Tailwind CSS
-Fetch API for backend communication

### Backend
-Node.js
-Express.js
-Passport.js (session-based auth)
-express-session + connect-mongo
-Mongoose (MongoDB ODM)

### Database
-MongoDB Atlas
