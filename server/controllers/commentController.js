const commentModel = require('../models/commentModel');
const postModel = require('../models/postModel');


const createComment = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.userId;
    const { content } = req.body;

    try {
        const post = await postModel.getPostById(postId);
        if (!post) return res.status(404).json({
            success: false,
            error: 'Post not found'
        });

        // Ensure post is published unless admin is commenting
        if (!post.published && req.user.role !== 'admin') return res.status(403).json({
            success: false,
            error: 'Only admins can comment on unpublished posts'
        })

        const comment = await commentModel.createComment(userId, postId, content);

        return res.status(201).json({
            success: true,
            message: 'Comment added successfully',
            comment
        });

    } catch (err) {
        console.error('Error creating comment');
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}



const getCommentsByPostId = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await postModel.getPostById(postId);
        if (!post) return res.status(404).json({
            success: false,
            error: 'Post not found'
        });

        if (!post.published && (!req.user || req.user.role !== 'admin')) return res.status(403).json({
            success: false,
            error: 'Only admins can view comments on unpublished posts'
        });

        const postTitle = post.title;
        
        const comments = await commentModel.getCommentsByPostId(postId);
        
        return res.status(200).json({
            success: true,
            message: 'Comments retrieved successfully',
            count: comments.length,
            postTitle,
            comments
        });

    } catch (err) {
        console.error('Error getting comments');
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}


const updateComment = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;
    const { content } = req.body;

    try {
        const commentToUpdate = await commentModel.getCommentById(id);
        if (!commentToUpdate) return res.status(404).json({
            success: false,
            error: 'Comment not found'
        });

        // Only user who commented can update comment
        if (commentToUpdate.user_id !== userId) return res.status(403).json({
                success: false,
                error: 'You are not authorized to update this comment. Only the owner can'
        });

        const updatedComment = await commentModel.updateComment(id, userId, content);

        return res.status(200).json({
            success: true,
            message: 'Comment updated successfully',
            comment: updatedComment
        });

    } catch (err) {
        console.error('Error updating comment');
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}


const deleteComment = async (req, res) => {
    const userId = req.user.userId;
    const { id } = req.params;
    const isAdmin = req.user.role === 'admin';

    try {
        const commentToDelete = await commentModel.getCommentById(id);
        if (!commentToDelete) return res.status(404).json({
            success: false,
            error: 'Comment not found'
        });

        // Ensure only user and admin can delete comment
        if (commentToDelete.user_id !== userId && !isAdmin) return res.status(403).json({
            success: false,
            error: 'You are not authorized to delete this comment'
        });

        let deletedComment;

        if (isAdmin) {
            deletedComment = await commentModel.deleteCommentAdmin(id);
        } else {
            deletedComment = await commentModel.deleteComment(id, userId);
        }
        
        return res.status(200).json({
            success: true,
            message: `Comment deleted successfully by ${isAdmin ? 'admin' : 'user'}`,
            comment: deletedComment
        })
    } catch (err) {
        console.error('Error deleting comment');
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}


module.exports = {
    createComment,
    getCommentsByPostId,
    updateComment,
    deleteComment
}