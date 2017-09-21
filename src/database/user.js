let mongoose=require("mongoose");
let Schema=mongoose.Schema;
mongoose.Promise = Promise;
const UserSchema=new Schema({
    username:{
        type:String,
        index:true,
        required:true
    },
    isAdmin:{
        type:String,
        default:0
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
    },
    create_time: Date
});
exports.User= mongoose.model("User",UserSchema);