import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './PostList';
import PostPage from './PostPage';
import CreateEditPost from './CreateEditPost';
import PostManagement from './PostManagement';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="/create" element={<CreateEditPost />} />
      <Route path="/edit/:id" element={<CreateEditPost />} />
      <Route path="/manage" element={<PostManagement />} />
    </Routes>
  </Router>
);

export default App;
