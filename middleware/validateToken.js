const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.TOKEN);
            req.user = decoded.user;
            return next();
        } catch (err) {
            if (err.message === "jwt expired") {
                return res.status(401).json({ error: 'Your session has expired. Please login again.' });
            }
            return res.status(401).json({ error: 'User is not authorized.' });
        }
    }

    res.status(401).json({ error: 'User is not authorized.' });
};

module.exports = validateToken;
