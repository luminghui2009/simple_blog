let mongoose=require("mongoose");
let Schema=mongoose.Schema;
mongoose.Promise = Promise;
const ArticleSchema=new Schema({
    sort:String,
    title:String,
    content:String,
    views:{
        type:Number,
        default:0
    },
    author:{
        name:''
    },
    comments:{
        type:Array,
        default:[]
    },
    create_time:{
        type:Date,
        default:new Date()
    }

});
exports.Articles= mongoose.model("Articles",ArticleSchema);