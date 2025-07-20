const Post = require('../models/Post');

const createPost = async (req, res) => { 
const {title, description} = req.body;

    try {
        const newPost = new Post({
            title,
            description,
            createdBy: req.user.id
        });
        await newPost.save();

        res.status(201).json({message: 'Post created successfully', post: newPost});
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, { title, description }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }
}

const deletePost = async (req, res) => {
    const {id} = req.params;

    try {
        const post = await Post.findByIdAndDelete(id);
        if (!post){
            return res.status(404).json({message: 'Post not found'});
        }
        if (post.createdBy.toString() !== req.user.id) {
            return res.status(403).json({message: 'You are not authorized to delete this post'});
        }
        await post.deleteOne();
        res.status(200).json({message: 'Post deleted successfully'});

    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost
};