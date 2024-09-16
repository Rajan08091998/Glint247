import jwt from 'jsonwebtoken';

const SECRET_KEY = 'kjsdfj9w3rjwerq2#%5q2349_'; // Store this in an environment variable

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.status(200).json({ username: decoded.username });
      } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      res.status(401).json({ message: 'Token required' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
