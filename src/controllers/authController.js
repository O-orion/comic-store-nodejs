const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

class AuthController {

    async register(req, res) {
        try {
            const { name, email, password, role } = req.body;

            if (!name || !email || password) {
                return res.status(400).json({ message: 'Name, email, and password are required' });
            }

            const existingUser = await userRepository.findByEmail(email);

            if (existingUser) return res.status(400).json({ message: 'Email already in use' });

            const user = await userRepository.create({
                name,
                email,
                password,
                role: role || 'customer'
            });

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            res.status(201).json({ message: 'User registered successfully', token });

        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error: error.message })
        }
    }
}

module.exports = new AuthController();
