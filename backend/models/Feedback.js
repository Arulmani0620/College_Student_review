const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  facultyName: {
    type: String,
    required: true
  },
  feedbackText: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Prevent duplicate feedback for same student-course combination
feedbackSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Feedback', feedbackSchema);