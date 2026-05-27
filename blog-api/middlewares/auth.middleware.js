import { keyExists } from "../services/keys.service.js";
import { getPostById } from "../services/posts.service.js";
import { getCommentById } from "../services/comments.service.js";
import { verifyToken } from "../utils/jwt.util.js";

export const authenticateKey = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if(!apiKey) {
        next({
            status : 401,
            message : 'No API key provided'
        });
    }

    const result = await keyExists(apiKey);

    if(!result.success) {
        next({
            status : 401,
            message : result.message
        });
    }
    next();
}

export const authorizePost = async (req, res, next) => {
    const user = req.user;
    const result = await getPostById(req.params.postId);
    if(result.post.userId !== user.userId) {
        next({
            status : 403,
            message : 'User not authorized to perform this action'
        });
    }
    next();
}

export const authorizeComment = async (req, res, next) => {
    const user = req.user;
    const result = await getCommentById(req.params.commentId);
    
    if(result.comment.userId !== user.userId) {
        next({
            status : 403,
            message : 'User not authorized to perform this action'
        });
    }
    next();
}

export const authorizeUser = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token) {
        next({
            status : 401, 
            message : 'No token provided'
        });
    }
    const verified = verifyToken(token);

    if(!verified.success) {
        next({
            status : 401,
            message : verified.message
        });
    }
    req.user = verified.user;
    console.log(req.user);
    
    next();
}