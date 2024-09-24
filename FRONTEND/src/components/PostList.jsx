import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../styles/PostList.module.css'; // Importing CSS module

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await axios.get('http://localhost:5000/api/posts');
    setPosts(response.data);
  };

  return (
    <div className={styles.container}>
      <h1>Blog Posts</h1>
      <div className={styles.linkContainer}>
        <Link to="/create" className={styles.link}>Create New Post</Link>
        <Link to="/manage" className={styles.link} style={{ marginLeft: '10px' }}>Manage Posts</Link> {/* New link for managing posts */}
      </div>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <Link to={`/post/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
              <small>{new Date(post.createdAt).toLocaleDateString()}</small>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
