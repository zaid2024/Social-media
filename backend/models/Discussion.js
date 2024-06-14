const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    hashtags: [String],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: String,
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    viewCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Discussion = mongoose.model('Discussion', DiscussionSchema);
module.exports = Discussion;
