const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Example in-memory notifications list
const sampleNotifications = [
  {
    ID: uuidv4(),
    Type: 'Event',
    Message: 'Welcome to the Campus Hiring portal!',
    Timestamp: new Date().toISOString(),
  },
  {
    ID: uuidv4(),
    Type: 'Result',
    Message: 'Your pre-test score has been published.',
    Timestamp: new Date(Date.now() - 3600 * 1000).toISOString(),
  },
];

// GET /notifications
router.get('/', async (req, res) => {
  res.json({ notifications: sampleNotifications });
});

module.exports = router;
