const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type :String,
        enum : ['President','Executive Vice President','Vice President','Secretary','Treasurer','User'],
        default : 'User'
    },
    year : {
        type : Number,
    },
    image: {
        type: String,
        required: true
    },
},{ timestamps: true });

module.exports = mongoose.model('Team', teamSchema);

