import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostManagement = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all posts to display in the management section
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/posts');
                setPosts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching posts');
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        // Delete a post by ID
        try {
            await axios.delete(`http://localhost:5000/api/posts/${id}`);
            setPosts(posts.filter(post => post._id !== id)); // Update the UI after deletion
        } catch (err) {
            console.error('Error deleting post', err);
        }
    };

    const handleEdit = (id) => {
        // Navigate to the edit page for the selected post
        navigate(`/edit/${id}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Manage Your Posts</h1>
            {posts.length > 0 ? (
                <ul>
                    {posts.map(post => (
                        <li key={post._id}>
                            <h3>{post.title}</h3>
                            <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                            <button onClick={() => handleEdit(post._id)}>Edit</button>
                            <button onClick={() => handleDelete(post._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts found</p>
            )}
        </div>
    );
};

export default PostManagement;
