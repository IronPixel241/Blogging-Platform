import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateEditPost = () => {
  const { id } = useParams(); // for edit mode
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchPost(); // Edit mode
  }, [id]);

  const fetchPost = async () => {
    const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
    setTitle(response.data.title);
    setContent(response.data.content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:5000/api/posts/${id}`, { title, content });
    } else {
      await axios.post('http://localhost:5000/api/posts', { title, content });
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? 'Edit Post' : 'Create Post'}</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">{id ? 'Update Post' : 'Create Post'}</button>
    </form>
  );
};

export default CreateEditPost;
