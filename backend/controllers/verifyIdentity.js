import jwt from 'jsonwebtoken';

const verifyIdentify = (token) => {
    if(!token) {
        return { success: false, message: "No token provided.", status: 401 };
    }
    var tokenDecoded;
    jwt.verify(token, "secret", (err, decoded) => {
        if(err) {
            return { success: false, message: "Failed to authenticate token.", status: 500 };
        }
        tokenDecoded = decoded;
    });
    return { success: true, tokenDecoded: tokenDecoded };
}

export default verifyIdentify;