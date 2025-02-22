import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(404).json({ message: 'Not authorized, login again', success: false });
        }
        const token_decode = await jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(404).json({ message: 'Not authorized, login again', success: false });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error ' + error.message, success: false });
    }
}

export default adminAuth;