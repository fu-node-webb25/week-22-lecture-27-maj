import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    postId : {
        type : String,
        unique : true,
        required : true
    },
    title : {
        type : String,
        required : true,
        minLength : 6
    },
    content : {
        type : String,
        required : true,
        minLength : 10
    },
    userId : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    }
}, { timestamps : true });

const Post = mongoose.model('Post', postSchema);

export default Post;