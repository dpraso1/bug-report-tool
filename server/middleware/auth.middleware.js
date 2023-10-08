import jwt from 'jsonwebtoken';
import { SECRET } from '../constants.js';

const verifyJwtToken = (req, res, next) => {
    const token = req.header('x-access-token');

    try {
        const decoded = jwt.verify(token, SECRET);
        if (decoded) {
            req.user = {
                id: decoded.id,
                role: decoded.role,
                email: decoded.email
            }
            next();
        }
    } catch (e) {
        res.status(401).send('Unauthorized!');
    }
}

export default verifyJwtToken;