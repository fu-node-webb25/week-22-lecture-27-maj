import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commentId : {
        type : String,
        required : true,
        unique : true
    },
    postId : {
        type : String,
        required : true,
    },
    userId : {
        type : String,
        required : true,
    },
    author : {
        type : String,
        required : true,
    },
    content : {
        type : String,
        required : true,
        minLength : 10
    }
}, { timestamps : true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;