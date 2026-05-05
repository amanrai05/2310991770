const fetch = require('node-fetch');

const LOG_API = process.env.LOG_API || 'http://20.207.122.201/evaluation-service/logs';

/**
 * Simple Log helper used by the backend scaffold. Sends logs to the evaluation Log API.
 * level: debug|info|warn|error|fatal
 * pkg: package string like 'api','controller','db'
 */
async function Log(level = 'info', pkg = 'api', message = '') {
  try {
    // Always print locally
    if (level === 'fatal' || level === 'error') console.error(`[${level}][${pkg}] ${message}`);
    else console.log(`[${level}][${pkg}] ${message}`);

    const token = process.env.EVAL_TOKEN || '';
    if (!token) return; // avoid failing if token absent in scaffold

    await fetch(LOG_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ stack: 'backend', level, package: pkg, message }),
    });
  } catch (e) {
    console.error('[Logger] failed to send log', e.message || e);
  }
}

module.exports = { Log };
