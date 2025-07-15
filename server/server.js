const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database('./skillmatrix.db');

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS team_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    avatar TEXT,
    github TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    icon TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS member_skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    member_id INTEGER,
    skill_id INTEGER,
    level INTEGER CHECK(level >= 1 AND level <= 5),
    FOREIGN KEY(member_id) REFERENCES team_members(id),
    FOREIGN KEY(skill_id) REFERENCES skills(id)
  )`);

  // Insert sample data
  db.run(`INSERT OR IGNORE INTO skills (name, category, icon) VALUES 
    ('JavaScript', 'Frontend', '🟨'),
    ('TypeScript', 'Frontend', '🔷'),
    ('Angular', 'Frontend', '🅰️'),
    ('React', 'Frontend', '⚛️'),
    ('Node.js', 'Backend', '🟢'),
    ('Python', 'Backend', '🐍'),
    ('Docker', 'DevOps', '🐳'),
    ('AWS', 'Cloud', '☁️'),
    ('Git', 'Tools', '📝'),
    ('SQL', 'Database', '🗄️')`);
});

// API Routes
app.get('/api/members', (req, res) => {
  db.all(`SELECT m.*, GROUP_CONCAT(s.name || ':' || ms.level) as skills
          FROM team_members m
          LEFT JOIN member_skills ms ON m.id = ms.member_id
          LEFT JOIN skills s ON ms.skill_id = s.id
          GROUP BY m.id`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(row => ({
      ...row,
      skills: row.skills ? row.skills.split(',').map(s => {
        const [name, level] = s.split(':');
        return { name, level: parseInt(level) };
      }) : []
    })));
  });
});

app.post('/api/members', (req, res) => {
  const { name, role, avatar, github } = req.body;
  db.run('INSERT INTO team_members (name, role, avatar, github) VALUES (?, ?, ?, ?)',
    [name, role, avatar, github], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
});

app.get('/api/skills', (req, res) => {
  db.all('SELECT * FROM skills ORDER BY category, name', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/member-skills', (req, res) => {
  const { member_id, skill_id, level } = req.body;
  db.run('INSERT OR REPLACE INTO member_skills (member_id, skill_id, level) VALUES (?, ?, ?)',
    [member_id, skill_id, level], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    });
});

app.listen(PORT, () => {
  console.log(`🚀 SkillMatrix API running on http://localhost:${PORT}`);
});