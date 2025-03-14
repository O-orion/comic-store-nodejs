const jwt = require('jsonwebtoken');

const userRepository = require('../repositories/userRepository');

const authMiddleware = (role) => async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userRepository.findById(decoded.id);
        if (!user) return res.status(401).json({ message: 'Invalid token' })

        if ( role && user.role !== role) {
            return res.status(403).json({ message: 'Insufficient permissions' })
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({ message: 'Invalid token' })
    }

}

module.exports = authMiddleware;
