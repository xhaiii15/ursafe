const express = require('express');
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', verifyToken, createPost);
router.get('/', verifyToken, getPosts);
router.put('/:id', verifyToken, updatePost);
router.delete('/:id', verifyToken, deletePost);

//temporary
router.get('/test', (req, res) => {
  res.send('Posts route is working');
});

module.exports = router;