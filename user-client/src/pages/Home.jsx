import './Home.css';
import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';

import { getAllPublishedPosts } from '../utils/api/postAPI';

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPublishedPosts();
        if (data.success) setPosts(data.posts);
        else setError(data.error || 'Failed to Load data');
      } catch (err) {
        console.error('Error fetching posts', err);
        setError('Something went wrong fetching posts');
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className='home'>
      <h1>Latest Posts</h1>

      {error && <p className='error'>{error}</p>}

      <div className="posts-container">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post}/>
          ))
        ) : (
          <p>No Posts found</p>
        )}
      </div>
    </div>
  )
}

export default Home
