import { Router } from 'express';
import bcrypt from 'bcrypt';
import { query } from '../config/db.js';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'Username, email, and password are required.' });
        }

        const existing = await query('SELECT id FROM users WHERE email = ? OR username = ?', [email, username]);
        if (existing.length) {
            return res.status(409).json({ success: false, message: 'User with that email or username already exists.' });
        }

        const hashed = await bcrypt.hash(password, 10);
        const result = await query(
            'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())',
            [username, email, hashed]
        );

        req.session.userId = result.insertId;
        return res.status(201).json({ success: true, message: 'User registered successfully.' });
    } catch (err) {
        console.error('Register error:', err);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

router.post('/logout', (req, res) => {
    if (!req.session) {
        return res.json({ success: true, message: 'Logged out.' });
    }
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ success: false, message: 'Could not log out.' });
        }
        res.clearCookie('inventory.sid');
        return res.json({ success: true, message: 'Logged out.' });
    });
});

router.get('/me', async (req, res) => {
    try {
        if (!req.session?.userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const users = await query('SELECT id, username, email, created_at FROM users WHERE id = ?', [req.session.userId]);
        if (!users.length) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.json({ success: true, user: users[0] });
    } catch (err) {
        console.error('Me error:', err);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

export default router;