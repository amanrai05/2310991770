const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// POST /register - simulate registration and return clientID/clientSecret
router.post('/register', (req, res) => {
  const { email, roll, githubUsername, accessCode } = req.body || {};
  if (!email || !roll || !githubUsername || !accessCode) {
    return res.status(400).json({ error: 'email, roll, githubUsername and accessCode required' });
  }

  // DO NOT use these values in a real system. This is scaffold sample data.
  const clientID = `cli_${uuidv4().slice(0, 8)}`;
  const clientSecret = `sec_${uuidv4().slice(0, 12)}`;

  return res.json({ clientID, clientSecret });
});

// POST /auth - simulate auth and return a bearer token
router.post('/auth', (req, res) => {
  const { email, clientID, clientSecret } = req.body || {};
  if (!email || !clientID || !clientSecret) {
    return res.status(400).json({ error: 'email, clientID, clientSecret required' });
  }
  const token = `token_${uuidv4()}`;
  return res.json({ token });
});

module.exports = router;
