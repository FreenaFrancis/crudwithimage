const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    place: { type: String, required: true },
    image: { type: String }
}, {
    timestamps: true
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
