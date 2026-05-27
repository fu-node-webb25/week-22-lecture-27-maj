import { Router } from 'express';
import { updateComment, deleteComment } from '../services/comments.service.js';
import { authenticateKey, authorizeUser, authorizeComment } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateKey);

// PATCH comment by commentId
router.patch('/:commentId', authorizeUser, authorizeComment, async (req, res, next) => {
    const { commentId } = req.params;
    const comment = req.body;
    if(!comment) {
        next({
            status : 400,
            message : 'No request body provided'
        });
    }

    const result = await updateComment(commentId, comment);
    console.log(result);
    
    if(result.success) {
        console.log('Här gick det bra');
        
        res.json({
            success : true,
            message : 'Comment updated successfully',
            comment : result.comment
        });
    } else {
        console.log('Här gick det mindre bra');
        next({
            status : 400,
            message : result.message
        });
    }
});

// DELETE comment by commentId
router.delete('/:commentId', authorizeUser, authorizeComment, async (req, res, next) => {
    const { commentId } = req.params;
    const result = await deleteComment(commentId);

    if(result.success) {
        res.json({
            success : true,
            message : 'Comment deleted successfully',
            comment : result.comment
        });
    } else {
        next({
            status : 404,
            message : result.message
        });
    }
});

export default router;