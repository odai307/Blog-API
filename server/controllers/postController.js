const postModel = require('../models/postModel');


// Create a post (Only admins allowed)
const createPost = async (req, res) => {
    let { title, content, published } = req.body;
    const userId = req.user.userId;

    title = title.trim();

    try {
        const newPost = await postModel.createPost(userId, title, content, published);

        return res.status(201).json({
            success: true,
            message: 'Post created Successfully',
            post: newPost
        });
    } catch (err) {
        console.error('Error creating a post', err);
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}


// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.getAllPosts();

        return res.status(200).json({
            success: true,
            message: 'All posts fetched successfully',
            count: posts.length,
            posts
        })
    } catch (err) {
        console.error('Error getting all posts', err);
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}


const getAllPublishedPosts = async (req, res) => {
    try {
        const posts = await postModel.getAllPublishedPosts();

        return res.status(200).json({
            success: true,
            message: 'All published posts fetched successfully',
            count: posts.length,
            posts
        })
    } catch (err) {
        console.error('Error getting all published posts', err);
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}


const getAllUnpublishedPosts = async (req, res) => {
    try {
        const posts = await postModel.getAllUnpublishedPosts();

        return res.status(200).json({
            success: true,
            message: 'All unpublished posts fetched successfully',
            count: posts.length,
            posts
        })
    } catch (err) {
        console.error('Error getting all unpublished posts', err);
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}


const getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await postModel.getPostById(id);

        if (!post) return res.status(404).json({
            success: false,
            error: 'Post not found'
        });

        if (!post.published) {
            if (!req.user || req.user.role !== 'admin') return res.status(403).json({
            success: false,
            error: 'Post not found'
        });
        }

        return res.status(200).json({
            success: true,
            message: 'Post fetched successfully',
            post
        });

    } catch (err) {
        console.error('Error getting post', err);
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}


// Update a post (admin only)
const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, published } = req.body;
    
    try {
        const existingPost = await postModel.getPostById(id);
        
        if (!existingPost) return res.status(404).json({
            success: false,
            error: 'Post not found'
        });

        // Keep old published value if not provided

        const updatedPost = await postModel.updatePost(id, title, content, published !== undefined ? published : existingPost.published);

        return res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            post: updatedPost
        })

    } catch (err) {
        console.error('Error updating post', err);
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}


// toggle a post into published and unpublished (admin only)
const togglePublishPost = async (req, res) => {
    const { id } = req.params;
    let { published } = req.body || {};

    try {
        const existingPost = await postModel.getPostById(id);

        if (!existingPost) return res.status(404).json({
            success: false,
            error: 'Post not found'
        });

        // Convert published to proper boolean if it's a string
        if (typeof published === 'string') {
            published = published.toLowerCase() === 'true';
        }

        const newPublishedState = published !== undefined ? published : !existingPost.published
        const updatedPost = await postModel.togglePublish(id, published !== undefined ? published : !existingPost.published);

        return res.status(200).json({
            success: true,
            message: `Post ${newPublishedState ? 'Published' : 'unpublished'} successfully`,
            post: updatedPost
        })

    } catch (err) {
        console.error('Error toggling publish post', err);
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}


// delete a post (admin only)
const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
         const existingPost = await postModel.getPostById(id);

        if (!existingPost) return res.status(404).json({
            success: false,
            error: 'Post not found'
        });

        const deletedPost = await postModel.deletePost(id);

        return res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
            post: deletedPost
        })

    } catch (err) {
        console.error('Error deleting post', err);
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}


module.exports = {
    createPost,
    getAllPosts,
    getAllPublishedPosts,
    getAllUnpublishedPosts,
    getPostById,
    updatePost,
    togglePublishPost,
    deletePost
}