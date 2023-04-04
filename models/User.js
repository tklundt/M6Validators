const mongoose = require('mongoose');

//Schema
const accountSchema = new mongoose.Schema({
    accountType: {
        type: String,
        required: true,
        enum: ['checking', 'saving']
      },
      balance: {
        type: Number,
        default: 0
      }
})

//User (Account holder)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/ // regex to validate email format
      },
      age: {
        type: Number,
        required: true,
        min: 18
      },
      account: accountSchema
});



userSchema.statics.findByCredentials = async (email) => {
    const user = await userSchema.findOne({ email });
    if (!user) {
        throw new Error('Invalid Email');
    }
    return user;
}

module.exports = mongoose.model('User', userSchema);