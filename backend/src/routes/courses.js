const express = require('express');
const router = express.Router();
const { getCourses, getCoursebyId } = require('../controllers/courses/course');

router.get('/course-list', async (req, res) => {
  try {
    const courses = await getCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/course-id', async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "course id is required..." })
  }
  try {
    const courses = await getCoursebyId(id)
    res.status(200).json(courses)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router;
