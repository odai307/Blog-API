import './EditPost.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost } from '../utils/api/postAPI';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Fetch post by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        if (data.success && data.post) {
          setTitle(data.post.title);
          setContent(data.post.content);
          setPublished(data.post.published);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error('Error fetching post', err)
        setError('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const data = await updatePost(id, title, content, published);
      if (data.success) {
        navigate('/');
      }
    } catch (err) {
      console.error('Error updating post', err);
      setError('Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="edit-post"><p>Loading post...</p></div>;
  }

  return (
    <div className="edit-post">
      <h1>Edit Post</h1>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="form-group">
          <label>Content:</label>
          <textarea
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Update content here..."
            required
          ></textarea>
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />{' '}
            Published
          </label>
        </div>

        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
};



export default EditPost;
