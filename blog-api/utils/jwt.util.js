import jwt from 'jsonwebtoken';

export const signToken = (payload) => {
    const token = jwt.sign(
        payload,
        process.env.MYSUPERSECRET,
        { expiresIn : 60 * 60 }
    );
    return token;
}

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.MYSUPERSECRET);
        return {
            success : true,
            user : decoded
        }
    } catch(error) {
        return {
            success : false,
            message : 'Invalid token'
        }
    }
}