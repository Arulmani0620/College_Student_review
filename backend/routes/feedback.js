const express = require('express');
const Feedback = require('../models/Feedback');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Add feedback (Students only)
router.post('/', auth, authorize('student'), async (req, res) => {
  try {
    const { courseId, facultyName, feedbackText, rating } = req.body;

    // Validation
    if (!courseId || !facultyName || !feedbackText || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const feedback = new Feedback({
      studentId: req.user.userId,
      courseId,
      facultyName,
      feedbackText,
      rating
    });

    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already submitted feedback for this course' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all feedback (Admin and Faculty)
router.get('/', auth, authorize('admin', 'faculty'), async (req, res) => {
  try {
    let query = {};
    
    // Faculty can only see their own feedback
    if (req.user.role === 'faculty') {
      query.facultyName = req.user.name;
    }

    const feedback = await Feedback.find(query).sort({ submittedAt: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get feedback by course (Admin and Faculty)
router.get('/course/:courseId', auth, authorize('admin', 'faculty'), async (req, res) => {
  try {
    let query = { courseId: req.params.courseId };
    
    // Faculty can only see their own feedback
    if (req.user.role === 'faculty') {
      query.facultyName = req.user.name;
    }

    const feedback = await Feedback.find(query).sort({ submittedAt: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get feedback statistics (Admin only)
router.get('/stats', auth, authorize('admin'), async (req, res) => {
  try {
    const totalFeedback = await Feedback.countDocuments();
    const avgRating = await Feedback.aggregate([
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);
    
    const ratingDistribution = await Feedback.aggregate([
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalFeedback,
      averageRating: avgRating[0]?.avgRating || 0,
      ratingDistribution
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;