import './ViewPost.css'
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../utils/api/postAPI';

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        if (data.success) {
          setPost(data.post);
        } else {
          setError('Failed to fetch post');
        }
      } catch (err) {
        console.error('Error fetching post', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="view-post">
      <Link to="/" className="back-btn">Back to Dashboard</Link>

      <h1 className="post-title">{post.title}</h1>
      <p className="post-meta">
        By <strong>{`${post.first_name} ${post.last_name}`}</strong> |{' '}
        {new Date(post.created_at).toLocaleDateString()} |{' '}
        <span className={`status ${post.published ? 'published' : 'unpublished'}`}>
          {post.published ? 'Published' : 'Unpublished'}
        </span>
      </p>

      <div className="post-content">
        <p>{post.content}</p>
      </div>
    </div>
  );

};

export default ViewPost;
