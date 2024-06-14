const Discussion = require('../models/Discussion');
const User = require('../models/User');
const cloudinary = require('../utils/cloudinary');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const createDiscussion = async (req, res) => {
    const { text, hashtags } = req.body;

    try {
        let image;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            image = result.secure_url;
            fs.unlinkSync(req.file.path);
        }

        const newDiscussion = new Discussion({
            user: req.user.id,
            text,
            image,
            hashtags
        });

        const discussion = await newDiscussion.save();
        res.json(discussion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find().populate('user', ['name', 'email']);
        res.json(discussions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getDiscussionsByHashtag = async (req, res) => {
    const hashtag = req.params.hashtag;

    try {
        const discussions = await Discussion.find({ hashtags: hashtag }).populate('user', ['name', 'email']);
        res.json(discussions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const updateDiscussion = async (req, res) => {
    const { text, hashtags } = req.body;

    const fieldsToUpdate = { text, hashtags };

    try {
        const discussion = await Discussion.findByIdAndUpdate(req.params.id, { $set: fieldsToUpdate }, { new: true });

        if (!discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

        res.json(discussion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const deleteDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findByIdAndRemove(req.params.id);

        if (!discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

        res.json({ msg: 'Discussion deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { createDiscussion, getDiscussions, getDiscussionsByHashtag, updateDiscussion, deleteDiscussion, upload };
