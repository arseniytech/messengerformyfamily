const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-later';

// ===== Middleware =====
app.use(cors());
app.use(express.json());

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// ===== Health / Test =====
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ db: 'connected', time: result.rows[0].now });
  } catch (err) {
    console.error('test-db error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ===== Auth (телефон + ПИН) =====
app.post('/auth/login', async (req, res) => {
  const { phone, pin } = req.body;

  if (!phone || !pin) {
    return res.status(400).json({ error: 'Phone and PIN are required' });
  }

  try {
    const result = await pool.query(
      'SELECT id, phone, display_name, password_hash FROM users WHERE phone = $1',
      [phone],
    );

    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid phone or PIN' });
    }

    const isValidPin = await bcrypt.compare(pin, user.password_hash);
    if (!isValidPin) {
      return res.status(401).json({ error: 'Invalid phone or PIN' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '12h' });

    res.json({
      token,
      user: {
        id: user.id,
        phone: user.phone,
        displayName: user.display_name,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ===== Contacts =====
app.get('/contacts', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, display_name, avatar_url, is_online FROM contacts ORDER BY id',
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Get contacts error:', err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// ===== Messages =====
// ОЖИДАЕТ, что в таблице messages есть столбцы:
// id, sender_id, receiver_id, text, created_at

// GET /messages?withUserId=<id> — история диалога
app.get('/messages', authMiddleware, async (req, res) => {
  const otherUserId = Number(req.query.withUserId);
  const currentUserId = req.userId;

  if (!otherUserId || Number.isNaN(otherUserId)) {
    return res.status(400).json({ error: 'withUserId parameter is required' });
  }

  try {
    const result = await pool.query(
      `
      SELECT
        id,
        sender_id   AS "senderId",
        receiver_id AS "receiverId",
        text,
        created_at  AS "createdAt"
      FROM messages
      WHERE (sender_id = $1 AND receiver_id = $2)
         OR (sender_id = $2 AND receiver_id = $1)
      ORDER BY created_at ASC
      `,
      [currentUserId, otherUserId],
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Get messages error:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// POST /messages — отправка сообщения
// ТЕЛО: { toUserId, text }
app.post('/messages', authMiddleware, async (req, res) => {
  const { toUserId, text } = req.body;
  const currentUserId = req.userId;

  if (!toUserId || !text || !text.trim()) {
    return res.status(400).json({ error: 'toUserId and text are required' });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO messages (sender_id, receiver_id, text)
      VALUES ($1, $2, $3)
      RETURNING
        id,
        sender_id   AS "senderId",
        receiver_id AS "receiverId",
        text,
        created_at  AS "createdAt"
      `,
      [currentUserId, toUserId, text.trim()],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Send message error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// ===== Start server =====
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});