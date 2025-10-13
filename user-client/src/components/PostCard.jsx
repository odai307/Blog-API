import './PostCard.css';
import { useNavigate } from 'react-router-dom';
import capitalize from '../utils/capitalize';

const PostCard = ({ post }) => {

    const navigate = useNavigate();

  return (
    <div className='post-card'
        onClick={() => navigate(`/posts/${post.id}`)}
    >
      <h2>{post.title}</h2>
      <p className='excerpt'>{post.content.slice(0, 120)}...</p>
      <small>
        By {capitalize(post.first_name)} {capitalize(post.last_name)} • {new Date(post.created_at).toLocaleDateString()}
      </small>
    </div>
  )
}

export default PostCard
