import { setUser } from '@/utils/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'kjsdfj9w3rjwerq2#%5q2349_'; // Store this in an environment variable

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const token = jwt.sign({ username: username }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ token, password:hashedPassword });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
