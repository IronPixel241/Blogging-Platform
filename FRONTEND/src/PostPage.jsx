import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PostPage = () => {
    const { id } = useParams(); // Get the post ID from the URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the blog post data using the post ID
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
                setPost(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching post');
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {post ? (
                <>
                    <h1>{post.title}</h1>
                    <p>Published on: {new Date(post.createdAt).toLocaleDateString()}</p>
                    <div>{post.content}</div>
                    <Link to="/" style={{ marginTop: '20px', display: 'block', textAlign: 'center' }}>
                        <button>Back to Home</button>
                    </Link> {/* Added a "Back to Home" button */}
                </>
            ) : (
                <p>Post not found</p>
            )}
        </div>
    );
};

export default PostPage;
