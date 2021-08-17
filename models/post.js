const mongoose = require('mongoose');
const schema = mongoose.Schema;
const postSchema = new mongoose.Schema({
    image:{ type: String, required:true},
    description:{ type:String, required:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    createdAt:{ type:Date, default:Date.now()},
});
module.exports=mongoose.model('post', postSchema)