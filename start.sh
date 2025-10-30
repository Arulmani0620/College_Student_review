#!/bin/bash

echo "🚀 Starting College Feedback System..."

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo "   Run: brew services start mongodb/brew/mongodb-community"
    echo "   Or: mongod --config /usr/local/etc/mongod.conf"
    exit 1
fi

echo "✅ MongoDB is running"

# Start backend server
echo "🔧 Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo "🎉 Application started successfully!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:5000"
echo ""
echo "Sample login credentials:"
echo "Student: student@college.edu / password123"
echo "Faculty: faculty@college.edu / password123"
echo "Admin: admin@college.edu / password123"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user to stop
wait