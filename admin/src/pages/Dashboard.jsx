import './Dashboard.css'
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllPosts, getAllPublishedPosts, getAllUnpublishedPosts, deletePost } from '../utils/api/postAPI';
import { logout } from '../utils/auth';

const Dashboard = () => {

    const [adminName, setAdminName] = useState('');


    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            const fullName = `${capitalize(user.first_name)} ${capitalize(user.last_name)}`;
            setAdminName(fullName);
        }
    }, []);


    useEffect(() => {
        const fetchPosts = async () => {
            try{
                let data;

                if (filter === 'published') data = await getAllPublishedPosts();
                else if (filter === 'unpublished') data = await getAllUnpublishedPosts();
                else data = await getAllPosts();
                
                if (data.success) {
                    setPosts(data.posts);
                }

            } catch (err) {
                console.error('Error fetching posts', err);
                setError('Failed to load posts')
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, [filter]);


    const handleDelete = async (id) => {
        try {
            const data = await deletePost(id);
            if (data.success) {
            setPosts((prev) => prev.filter((p) => p.id !== id)); // remove deleted post locally
            }
        } catch (err) {
            console.error('Error deleting post:', err);
            setError('Failed to delete post');
        }
        finally {
            setShowDeleteModal(false);
        }
    };



    const capitalize = (word) => {
        if (!word || typeof(word) !== 'string') return '';
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    } 



    if (loading) return <p>Loading Posts...</p>
    if (error) return <p className='error'>{error}</p>

  return (
    <div className='dashboard'>
        <div className="dashboard-header">
            <h1>Admin Dashboard</h1>
            <span className='admin-name'>{adminName}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      
      <div className="actions">
        <button onClick={() => navigate('/posts/new')}>+ New Post</button>

        <select value={filter} onChange={(e) => setFilter(e.target.value)} className='filter-select'>
            <option value="all">All Posts</option>
            <option value="published">Published Posts</option>
            <option value="unpublished">Unpublished Posts</option>
        </select>

      </div>

      {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Published</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post) => (
                    <tr key={post.id} className='clickable-row'
                        onClick={() => navigate(`/posts/view/${post.id}`)}
                    >
                        <td>{post.title}</td>
                        <td>{`${capitalize(post.first_name)} ${capitalize(post.last_name)}`}</td>
                        <td>{new Date(post.created_at).toLocaleDateString()}</td>
                        <td>{`${post.published ? 'Yes' : 'No'}`}</td>
                        <td>
                            <Link to={`/posts/edit/${post.id}`}
                                onClick={(e) => e.stopPropagation()} // prevent navigation when clicking edit
                            >Edit</Link>
                            <button onClick={(e) => {
                                e.stopPropagation();
                                setPostToDelete(post.id);
                                setShowDeleteModal(true);
                            }}  
                            className='delete-btn'>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      )}
     {showDeleteModal && (
        <div className="modal-overlay">
            <div className="modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this post?</p>
            <div className="modal-actions">
                <button onClick={() => setShowDeleteModal(false)} className="cancel-btn">
                Cancel
                </button>
                <button
                onClick={() => {
                    handleDelete(postToDelete);
                    setShowDeleteModal(false);
                }}
                className="delete-btn"
                >
                Delete
                </button>
            </div>
            </div>
        </div>
        )}

    </div>
  )
}

export default Dashboard
