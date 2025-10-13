import './PostDetail.css';
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostById } from "../utils/api/postAPI";
import capitalize from '../utils/capitalize';


const PostDetail = () => {

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        if (data.success) setPost(data.post);
        else setError(data.error || 'Failed to load post');
      } catch (err) {
        console.error('Error fetching post', err);
        setError('Something went wrong fetching post');
      }
    }
    fetchPost();
  }, [id]);

  if (error) return <p className='error'>{error}</p>
  if (!post) return <p>No post found</p>

  return (
    <div className='post-detail'>
      <a 
        className='back' 
        onClick={() => window.location.href = '/'}
        >
        ← Back to Homepage
      </a>
      <h1>{post.title}</h1>
      <p className="meta">
        By {capitalize(post.first_name)} {capitalize(post.last_name)} • {new Date(post.created_at).toLocaleDateString()}
      </p>
      <div className="content">{post.content}</div>
      <a 
        className='top' 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑ Top
      </a>

    </div>
  )
}

export default PostDetail
