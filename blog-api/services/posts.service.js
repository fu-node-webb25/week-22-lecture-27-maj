import Post from "../models/post.model.js";

// Get all posts
export const getPosts = async () => {
    try {
        const result = await Post.find();
        return {
            success : true,
            posts : result
        }
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}

// Get post by postId
export const getPostById = async (postId) => {
    try {
        const result = await Post.findOne({ postId });
        if(result) {
            return {
                success : true,
                post : result
            }
        } else throw new Error('Post not found');
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}

// Get post by userId
export const getPostsByUserId = async (userId) => {
    try {
        const result = await Post.find({ userId });
        return {
            success : true,
            posts : result
        }
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}

// Add new post
export const addPost = async (post) => {
    try {
        const result = await Post.create(post);
        return {
            success : true,
            post : result
        }
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}

// Update post
export const updatePost = async (postId, post) => {
    try {
        const result = await Post.findOneAndUpdate({ postId }, post);
        return {
            success : true, 
            post : result
        }
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}

// Delete post
export const deletePost = async (postId) => {
    try {
        const result = await Post.findOneAndDelete({ postId });
        return {
            success : true, 
            post : result
        }
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}