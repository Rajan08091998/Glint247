import { getUser } from '@/utils/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'kjsdfj9w3rjwerq2#%5q2349_'; // Store this in an environment variable

export default async function handler(req, res) {

    // try {
        if (req.method === 'POST') {
            const { username, password , user_name, user_password} = req.body;
            
        
            // Retrieve user data from the database (omitted for brevity)
            console.log(req.body)
            const isMatch = await bcrypt.compare(password, user_password);
        
            if (isMatch) {
        
                let token;
                try {
                token = jwt.sign({ username: user_name }, SECRET_KEY, { expiresIn: '1h' });
                    
                } catch (error) {
                    console.log(error)
                }
              res.status(200).json({ token });
            } else {
              res.status(401).json({ message: 'Invalid credentials' });
            }
          } else {
            res.status(405).json({ message: 'Method not allowed' });
          }
        
    // } catch (error) {
        
    //     res.status(400).json({ err: error });

    // }
  
}
