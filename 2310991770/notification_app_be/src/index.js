const express = require('express');
const bodyParser = require('body-parser');
const notificationsRouter = require('./routes/notifications');
const authRouter = require('./routes/auth');
const { Log } = require('./logger');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Notification backend scaffold running'));

app.use('/notifications', notificationsRouter);
app.use('/', authRouter);

app.listen(PORT, async () => {
  await Log('info', 'server', `Backend scaffold listening on ${PORT}`);
  console.log(`Backend scaffold listening on http://localhost:${PORT}`);
});
