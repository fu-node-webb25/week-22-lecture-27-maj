import Comment from "../models/comment.model.js";

// Get comment by commentId
export const getCommentById = async (commentId) => {
    try {
        const result = await Comment.findOne({ commentId });
        if(result) {
            return {
                success : true,
                comment : result
            }
        } else throw new Error('Comment not found');
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}

// Get comments by postId
export const getCommentsByPostId = async (postId) => {
    try {
        const result = await Comment.find({ postId });
        if(result) {
            return {
                success : true,
                comments : result
            }
        } else throw new Error('No Comments found');
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}

// Get comment by userId
export const getCommentsByUserId = async (userId) => {
    try {
        const result = await Comment.find({ userId });
        if(result) {
            return {
                success : true,
                comment : result
            }
        } else throw new Error('No Comments found');
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}

// Add new comment
export const addComment = async (comment) => {
    try {
        const result = await Comment.create(comment);
        return {
            success : true,
            comment : result
        }
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}

// Update comment
export const updateComment = async (commentId, updates) => {
    try {
        const comment = await Comment.findOne({ commentId });
        if(!comment) throw new Error('Comment not found');
        comment.content = updates.content;
        const updatedComment = await comment.save();
        return {
            success : true,
            comment : updatedComment
        }
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}

// Delete comment
export const deleteComment = async (commentId) => {
    try {
        const result = await Comment.findOneAndDelete({ commentId });
        return {
            success : true,
            comment : result 
        }
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}
