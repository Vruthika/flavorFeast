var mongoose = require('mongoose');

// userSchema
var userSchema = mongoose.Schema({

   
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Number
    },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }
});

var User = module.exports = mongoose.model('User', userSchema);
