# College Feedback System - MERN Stack

A comprehensive feedback management system for colleges built with MongoDB, Express.js, React.js, and Node.js.

## Features

### User Roles
- **Students**: Submit feedback for courses, faculty, and infrastructure
- **Faculty**: View feedback for their courses
- **Admin**: View all feedback and generate statistics

### Key Functionality
- User authentication with JWT
- Role-based access control (RBAC)
- Feedback submission with ratings (1-5 stars)
- Real-time feedback viewing
- Statistics dashboard for admins
- Modern responsive UI design

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- Context API for state management
- Modern CSS with gradients and glassmorphism

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/college-feedback
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Feedback
- `POST /api/feedback` - Submit feedback (Students only)
- `GET /api/feedback` - Get all feedback (Admin/Faculty)
- `GET /api/feedback/course/:courseId` - Get feedback by course
- `GET /api/feedback/stats` - Get feedback statistics (Admin only)

## User Roles & Permissions

| Feature | Student | Faculty | Admin |
|---------|---------|---------|-------|
| Submit Feedback | ✅ | ❌ | ❌ |
| View Own Course Feedback | ❌ | ✅ | ✅ |
| View All Feedback | ❌ | ❌ | ✅ |
| View Statistics | ❌ | ❌ | ✅ |

## Sample Users for Testing

### Student
- Email: student@college.edu
- Password: password123
- Role: student

### Faculty
- Email: faculty@college.edu
- Password: password123
- Role: faculty

### Admin
- Email: admin@college.edu
- Password: password123
- Role: admin

## Database Schema

### User Model
```javascript
{
  userId: String (unique),
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/faculty/admin),
  department: String
}
```

### Feedback Model
```javascript
{
  studentId: String,
  courseId: String,
  facultyName: String,
  feedbackText: String,
  rating: Number (1-5),
  submittedAt: Date
}
```

## Features Implemented

✅ User Registration & Authentication
✅ Role-based Access Control
✅ Feedback Submission (Students)
✅ Feedback Viewing (Faculty/Admin)
✅ Statistics Dashboard (Admin)
✅ Modern Responsive UI
✅ Input Validation
✅ Error Handling
✅ Protected Routes
✅ JWT Token Management

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes
- Role-based access control
- Input validation and sanitization
- CORS configuration

## UI/UX Features

- Modern glassmorphism design
- Gradient backgrounds
- Responsive layout
- Interactive rating system
- Loading states
- Error/success messages
- Clean navigation
- Role-based UI elements

## Future Enhancements

- Email notifications
- Advanced analytics
- File upload for feedback
- Multi-language support
- Dark/Light theme toggle
- Export feedback reports
- Real-time notifications

## License

This project is licensed under the MIT License.

## Support

For any issues or questions, please contact the development team.