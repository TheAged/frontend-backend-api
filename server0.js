const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// 資料庫連線
const db = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: ''
});

db.connect();

// 註冊 API
app.post('/api/register', async (req, res) => {
  const { name, phone, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)',
    [name, phone, email, hashed],
    (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: 'DB error' });
      }
      res.json({ success: true });
    }
  );
});

// 登入 API
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (results.length === 0) return res.json({ success: false, message: '帳號不存在' });

    const match = await bcrypt.compare(password, results[0].password);
    if (match) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: '密碼錯誤' });
    }
  });
});

app.listen(port, () => {
  console.log(`後端啟動於 http://localhost:${port}`);
});

     


