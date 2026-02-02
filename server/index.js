const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Test 

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM contacts');
    res.json({ 
      status: 'connected', 
      contactsCount: result.rows[0].count 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/contacts', async (req, res) => {
    try {
      const result = await pool.query(
        'SELECT id, username, display_name, avatar_url, is_online FROM contacts ORDER BY id'
      );
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});