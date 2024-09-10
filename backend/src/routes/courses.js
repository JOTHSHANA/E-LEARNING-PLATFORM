const express = require('express');
const router = express.Router();
const { getCourses } = require('../controllers/courses/course');

// Define the route for fetching course list
router.get('/course-list', async (req, res) => {
  try {
    const courses = await getCourses();  
    res.status(200).json(courses); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
