import jwt from 'jsonwebtoken';

const verifyIdentify = (token) => {
    if(!token) {
        return { success: false, message: 'No token provided.', status: 401 };
    }
    jwt.verify(token, 'secret', (err, tokenDecoded) => {
        if(err) {
            return { success: false, message: 'Failed to authenticate token.', status: 500 };
        }
        return { success: true, tokenDecoded };
    });
}

export default verifyIdentify;