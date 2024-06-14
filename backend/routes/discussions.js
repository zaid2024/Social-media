const express = require('express');
const { createDiscussion, getDiscussions, getDiscussionsByHashtag, updateDiscussion, deleteDiscussion, upload } = require('../controllers/discussionController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// @route   POST api/discussions
// @desc    Create discussion
// @access  Private
router.post('/', auth, upload.single('image'), createDiscussion);

// @route   GET api/discussions
// @desc    Get all discussions
// @access  Public
router.get('/', getDiscussions);

// @route   GET api/discussions/hashtag/:hashtag
// @desc    Get discussions by hashtag
// @access  Public
router.get('/hashtag/:hashtag', getDiscussionsByHashtag);

// @route   PUT api/discussions/:id
// @desc    Update discussion
// @access  Private
router.put('/:id', auth, updateDiscussion);

// @route   DELETE api/discussions/:id
// @desc    Delete discussion
// @access  Private
router.delete('/:id', auth, deleteDiscussion);

module.exports = router;
