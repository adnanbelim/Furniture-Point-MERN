import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, login again', success: false });
        }
        const token_decode = await jwt.verify(token, process.env.JWT_SECRET);
        // when we generate token it give id so token_decode have id
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error ' + error.message, success: false });
    }
}

export default userAuth;